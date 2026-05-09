import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { Type } from "typebox";

export default function (pi: ExtensionAPI) {
  pi.registerTool({
    name: "compact_context",
    label: "Compact Context",
    description:
      "Trigger context compaction. Useful for long-sessions or when orchestrating subagents/multi-step workflows to keep context size low.",
    parameters: Type.Object({}),
    async execute(_toolCallId, _params, _signal, _onUpdate, ctx) {
      await ctx.compact();
      return {
        content: [{ type: "text", text: "Compaction requested." }],
        details: {},
      };
    },
  });

  pi.registerTool({
    name: "context_info",
    label: "Context Info",
    description: "Report the current context length for the active model.",
    parameters: Type.Object({}),
    async execute(_toolCallId, _params, _signal, _onUpdate, ctx) {
      const usage = ctx.getContextUsage();

      if (!usage) {
        return {
          content: [{ type: "text", text: "Context usage is unavailable right now." }],
          details: {},
        };
      }

      return {
        content: [
          {
            type: "text",
            text:
              usage.percent === null
                ? `Current context length: ${usage.tokens} tokens.`
                : `Current context length: ${usage.tokens} tokens (${usage.percent.toFixed(1)}% of maximum context window).`,
          },
        ],
        details:
          usage.percent === null
            ? {
                tokens: usage.tokens,
                contextWindow: usage.contextWindow,
                usage,
              }
            : {
                tokens: usage.tokens,
                percent: usage.percent,
                contextWindow: usage.contextWindow,
                usage,
              },
      };
    },
  });
}
