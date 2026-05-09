# pi-compact-tool

`pi-compact-tool` is a tiny [pi](https://pi.dev) coding agent extension that
exposes a single tool: `compact_context`.

When the tool is called, it triggers compaction of the current session context.

This allows models to manage their own context, without needing to wait for
auto-compaction or the user manually triggering `/compact`, and is
especially useful for orchestration agents that manage subagents and run
multi-step workflows.

## Install

Install the published package with `pi install`:

```bash
pi install npm:pi-compact-tool
pi install git:github.com/theduke/pi-compact-tool
```

## Usage

```bash
pi -e .
```

Then ask the agent to use the `compact_context` tool when you want the current conversation compacted.

## Development

```bash
npm install
npm run typecheck
npm run lint
```
