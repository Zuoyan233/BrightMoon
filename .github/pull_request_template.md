## 变更类型 / Type of change

- [ ] Bug fix / 缺陷修复（不破坏现有功能的问题修复）
- [ ] New feature / 新功能（不破坏现有功能的功能新增）
- [ ] Breaking change / 破坏性变更（会导致现有功能无法按预期工作）
- [ ] Other / 其他（请说明 / please describe）：

## 检查清单 / Checklist

- [ ] 我已确认本 PR 不是个人配置或个人内容改动 / I have confirmed this PR is not for personal changes.
- [ ] 我已自审代码 / I have performed a self-review of my own code.
- [ ] 我的改动没有引入新的警告 / My changes generate no new warnings.

## 关联 Issue / Related Issue

<!-- 请填写本 PR 解决的 Issue，例如 #123 / Please link to the issue that this PR addresses, e.g. #123 -->

## 变更说明 / Changes

<!-- 请说明改了什么、为什么这样改 / Please describe what you changed and why -->

## 测试方式 / How To Test

<!-- 请说明如何验证，例如 pnpm check、pnpm lint、pnpm build 或浏览器手动步骤 / Please describe how you tested your changes -->

## 截图 / Screenshots (if applicable)

<!-- 涉及 UI 变更时请附截图 / If you made any UI changes, please include screenshots -->

## 补充说明 / Additional Notes

<!-- 其他需要告知维护者的信息 / Any additional information you want to share with the reviewer -->

## 注意事项 / Notes

- 本项目仅接受 pnpm，`npm` / `yarn` 会被 `preinstall` 脚本拦截。/ This project only accepts pnpm; npm/yarn are blocked by a `preinstall` script.
- 不要提交个人配置与内容：`src/config/user/`、`src/content/`、`src/assets/images/` 以及 `public/` 下的个人资源。/ Do not commit personal config or content: `src/config/user/`, `src/content/`, `src/assets/images/`, or personal assets under `public/`.
- 不要为了个人需求修改 `src/config/defaults/`，升级时会被覆盖；用户配置请放在 `src/config/user/`。/ Do not modify `src/config/defaults/` for personal needs — it is overwritten on upgrade; put user config in `src/config/user/`.
- 提交前请运行 `pnpm check`、`pnpm lint` 与 `pnpm build`，确认无新增警告与构建错误。/ Run `pnpm check`, `pnpm lint`, and `pnpm build` before submitting.
- 涉及 CI 改动时，请确认 `.github/workflows/CI.yml` 的 Astro Check 与 Astro Build 两个任务均能通过。/ For CI changes, make sure both Astro Check and Astro Build jobs pass.
- 请勿在 PR、代码或截图中包含 `.env`、`INDEXNOW_KEY`、Bilibili `SESSDATA`、文章加密密码等敏感信息。/ Do not include `.env`, `INDEXNOW_KEY`, Bilibili `SESSDATA`, or post-encryption passwords in the PR, code, or screenshots.
