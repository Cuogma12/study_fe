'use strict';

const fs = require('node:fs');
const path = require('node:path');

function loadDotEnvLocal() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  if (!fs.existsSync(envPath)) return;

  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const eqIndex = trimmed.indexOf('=');
    if (eqIndex <= 0) continue;

    const key = trimmed.slice(0, eqIndex).trim();
    const value = trimmed.slice(eqIndex + 1).trim();

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

function sendJsonRpc(message) {
  const payload = Buffer.from(JSON.stringify(message), 'utf8');
  const header = `Content-Length: ${payload.length}\r\n\r\n`;
  process.stdout.write(header);
  process.stdout.write(payload);
}

async function callStitchTool(params) {
  const stitchKey = process.env.STITCH_API_KEY;
  const stitchUrl = process.env.STITCH_API_URL || 'https://stitch.googleapis.com/v1/mcp';

  if (!stitchKey) {
    return {
      content: [
        {
          type: 'text',
          text: 'Missing STITCH_API_KEY in environment.',
        },
      ],
      isError: true,
    };
  }

  const body = {
    tool: params?.name,
    input: params?.arguments || {},
  };

  const response = await fetch(stitchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${stitchKey}`,
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();
  if (!response.ok) {
    return {
      content: [
        {
          type: 'text',
          text: `Stitch request failed (${response.status}): ${text}`,
        },
      ],
      isError: true,
    };
  }

  return {
    content: [
      {
        type: 'text',
        text,
      },
    ],
  };
}

async function handleRequest(request) {
  const { id, method, params } = request;

  if (method === 'initialize') {
    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      result: {
        protocolVersion: '2024-11-05',
        serverInfo: {
          name: 'study-fe-stitch-mcp',
          version: '1.0.0',
        },
        capabilities: {
          tools: {},
        },
      },
    });
    return;
  }

  if (method === 'tools/list') {
    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      result: {
        tools: [
          {
            name: 'stitch.call',
            description: 'Call Google Stitch MCP endpoint with a tool name and arguments.',
            inputSchema: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  description: 'Tool name to call on Stitch.',
                },
                arguments: {
                  type: 'object',
                  description: 'Arguments payload for the Stitch tool call.',
                },
              },
              required: ['name'],
            },
          },
        ],
      },
    });
    return;
  }

  if (method === 'tools/call') {
    try {
      const result = await callStitchTool(params);
      sendJsonRpc({
        jsonrpc: '2.0',
        id,
        result,
      });
    } catch (error) {
      sendJsonRpc({
        jsonrpc: '2.0',
        id,
        result: {
          content: [
            {
              type: 'text',
              text: `Unexpected error while calling Stitch: ${error instanceof Error ? error.message : String(error)}`,
            },
          ],
          isError: true,
        },
      });
    }
    return;
  }

  if (method === 'notifications/initialized') {
    return;
  }

  if (id !== undefined) {
    sendJsonRpc({
      jsonrpc: '2.0',
      id,
      error: {
        code: -32601,
        message: `Method not found: ${method}`,
      },
    });
  }
}

function startServer() {
  loadDotEnvLocal();

  let buffer = Buffer.alloc(0);

  process.stdin.on('data', (chunk) => {
    buffer = Buffer.concat([buffer, chunk]);

    while (true) {
      const separator = buffer.indexOf('\r\n\r\n');
      if (separator === -1) break;

      const header = buffer.slice(0, separator).toString('utf8');
      const match = header.match(/Content-Length:\s*(\d+)/i);
      if (!match) {
        buffer = buffer.slice(separator + 4);
        continue;
      }

      const contentLength = Number(match[1]);
      const totalLength = separator + 4 + contentLength;
      if (buffer.length < totalLength) break;

      const body = buffer.slice(separator + 4, totalLength).toString('utf8');
      buffer = buffer.slice(totalLength);

      try {
        const request = JSON.parse(body);
        Promise.resolve(handleRequest(request)).catch(() => {});
      } catch {
        // Ignore malformed JSON-RPC payloads.
      }
    }
  });
}

startServer();
