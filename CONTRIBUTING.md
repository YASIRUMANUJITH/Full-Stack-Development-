# Contributing to SyncBoard

## Ground Rules

1. **Everyone codes.** Every member commits from their own GitHub account.
2. **One branch per package/slice**, named exactly as listed in the Team Handout.
3. **Commit messages are conventional**: `feat(data): ...`, `style: ...`, `docs: ...`, `chore: ...`.
4. **Never merge your own pull request.** Swap reviews: a different member approves and clicks Merge.
5. **Shared file rule:** `index.css` is append-only. Each UI slice appends its own labelled section at the end in merge order - do not reorder or delete another slice's section.
6. **Blocked?** Say so in the group chat within 30 minutes. Do not stall silently.
7. **Windows tip:** If PowerShell refuses npm with "scripts are disabled," use Command Prompt or `npm.cmd`.

## Definition of Done

- Acceptance criteria in the slice guide are met.
- `npm run dev` shows a working app; nothing previously working is broken.
- `npm run lint` reports zero errors and `npm run build` succeeds.
- Pull request description includes a screenshot of the change.
- Reviewed and merged by a different member.

## Timeline

| When                    | What happens                         |
| ----------------------- | ------------------------------------ |
| Fri 21 Aug (today)      | Stub-upgrade commit lands - everyone can branch in any order |
| Sat 22 Aug evening      | All pull requests merged on master   |
| Sun 23 Aug morning      | Docs merged, final tag `assignment-01-static-front-end-skeleton` pushed, demo rehearsed |
