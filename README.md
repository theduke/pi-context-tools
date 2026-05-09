# pi-context-tools

`pi-context-tools` is a tiny [pi](https://pi.dev) coding agent extension that
allows agents to inspect and compact their own context.

It exposes two tools:

- `context_info` reports the current context usage, including token count and
  available context-window details.
- `compact_context` triggers compaction of the current session context.

Together, these tools let agents inspect their own context usage and compact it
on demand, without waiting for auto-compaction or requiring the user to run
`/compact` manually. 

This is especially useful for orchestration agents that coordinate subagents
or run long multi-step workflows.

## Install

Install the published package with `pi install`:

```bash
pi install npm:pi-context-tools
pi install git:github.com/theduke/pi-context-tools
```

## Usage

Instruct agents to the `context_info` tool to get information about the current
context, and the `compact_context` to compact the context.

## Development

```bash
npm install
npm run typecheck
npm run lint
```

For local compaction testing, this repo can use project-local pi settings in
`.pi/settings.json`:

```json
{
  "compaction": {
    "keepRecentTokens": 500
  }
}
```

`keepRecentTokens` is only the target for how much recent conversation pi keeps
after summarizing older entries. The reported context size after compaction will
usually be higher because it also includes the system prompt, tool definitions,
the generated compaction summary, and any messages sent after compaction. This is
expected when debugging `compact_context` and does not by itself mean compaction
failed.
