# 09 — 可复现、隔离的静态发布

目标：官网部署只包含公开产物，具备真实404与安全头，不影响已有项目。

改动：官网子项目锁定Wrangler 4.155.0，新增静态资源配置、404-page与auto-trailing-slash策略；整理发布/旧源站回退手册；源码格式化；补齐语义、描述、分享图与对比度回归。

验收：新名称createx-web此前不存在（Cloudflare 10007只读确认）。dry-run成功；12项自动测试、ESLint与strict TS通过。已部署独立Worker：版本（部署标识保留在本地运维记录）；尚未绑定createx.us。仅上传官网静态资产，未修改dt、旧Pages、其他Worker或邮件记录。

追加验收：完整预览核验28/28通过，包含14页本地字节一致、8份下载资源、安全头、严格TLS、真实404、根重定向及尾斜杠路由；机器回执在../operations/preview-verification.json。第10轮将绑定指定域名并验证实际域名，不能把workers.dev当成最终交付。
