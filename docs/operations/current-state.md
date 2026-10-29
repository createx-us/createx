# 当前交付检查点

截至2026-10-29，继续原有任务，没有创建替代任务。

## 已完成

- 先保存功能与交互设计；monorepo官网14页、中英文等价路由、8份公开资源、本地申请草稿、角色/城市/伙伴/治理/FAQ。
- 源码首次已提交至用户指定公开仓库createx-us/createx，主提交496d7e9054113af6e53c5f78c38966fb64fb30ef，GitHub API已核实远程main一致；保留远程原LICENSE提交ae41a55。后续交付记录将追加提交。
- 12项自动测试、ESLint、strict TypeScript、构建和Wrangler dry-run通过。
- 独立静态Worker createx-web已上线，仅用于交付前验证；不是指定域名的替代交付。
- 独立预览28/28 HTTP检查通过，包含14页/8下载/404/重定向/安全头/版本和字节一致，详见preview-verification.json。
- 原站A及www均44.216.86.78、DNS only、TTL Auto已记录，旧源站未删除；dt、其他项目及邮件未修改。
- 招募包、6份Drive资料、35页详解可读文本及用户指定(3)副本归档在documents/private，不提交、不发布。

## 指定域名：阻塞，未完成

Wrangler绑定createx.us及www.createx.us的操作收到Cloudflare 100117：域名仍有外部管理的A记录，要求先处理旧记录。已核实官方CLI的覆盖选项并仅重试一次，仍返回相同冲突。成功的Worker资产部署未被回滚；不能将此报告为域名已上线。

用本次已授权OAuth只读请求精确zone的DNS记录，Cloudflare返回403/10000 Authentication error，说明当前最小权限登录不含DNS记录访问。未删除或修改任何旧DNS；未扩大证书或其他服务权限；未绕过拒绝。继续域名切换需要现有授权浏览器恢复后处理这两个DNS记录，或取得该zone限定的DNS权限。本次不重复向用户索取许可。

## 浏览器下载旧提示

唯一触发旧下载提示的调用为‘验证本地申请下载与清空’：在本机/en/join/#application测试自动下载；调用等待约215秒后返回Transport closed，结果不确定。当前没有可调用的浏览器取消接口，也没有该平台请求的messageId，不能猜ID取消。此后没有再调用浏览器下载；代码已改成先生成再显示保存链接，验证转为DOM模拟和命令行HTTP。旧浏览器提示属于先前悬挂请求，不能由源码修改关闭。

GitHub认证旧等待已结束；Wrangler登录完成且认证进程已结束；原request_user_input_async已由用户选择1回复，不应再次创建同一批准。已结束无用的旧git ls-remote进程，远程核验改用GitHub API。

## 验收缺口

真实Chrome已有英文桌面首页视觉、角色选择、语言锚点、空值/纯空格校验记录。后续显式下载、中文桌面、真实手机布局和导航、返回操作，以及指定域名TLS与线上流程仍待完成。DOM模拟已覆盖关键交互，但不能代替这些真实浏览器验收。
