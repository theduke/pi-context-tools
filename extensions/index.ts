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
}
