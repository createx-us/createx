# 发布前现场记录与回退

核实日期：2026-10-29；集成发布者唯一。

- Cloudflare Account：BoardX Inc，cc39c0447db8c730182cfd075fe91bf7。
- createx.us Zone ID：990207185cc842bb578e3904a0447eaa（从域名Overview实际读取）。
- 域名Active；Free zone；到期2027-03-01；现有Workers Paid订阅不变。
- 当前root与www：A 44.216.86.78，DNS only，TTL Auto；dt：CNAME createx-project.pages.dev，Proxied。不改dt或任何其他项目。
- 邮件MX分别mx1/2/3.qiye.aliyun.com，优先级5/10/15；SPF/DKIM等保留。
- 现有root HTTPS证书与createx.us不匹配，curl严格TLS验证失败；没有绕过证书警告。HTTP抓取仅134字节，留在本地backups/current-site，不能声称已得到完整可恢复旧站源码。
- 当前Cloudflare域名Overview显示No Workers connected。先检查Pages/原站来源再切换。
- 用户指定GitHub：createx-us/createx，已核实admin/push=true，初始size=0，public。保持既有可见性，仅提交公开网站源码和公开设计文档；documents/private、原始文档和备份不提交。
- Wrangler未认证，gh已有token无效；可以使用现有Cloudflare网页登录会话和GitHub连接器，不扩大持久权限。

## 域名回退

若切换到新官网后出现故障，撤回仅createx.us及www的新映射，恢复原先A 44.216.86.78、DNS only、TTL Auto。保留原外部源站；原站当前TLS问题仍存在，回退不承诺修复原站。若采用Worker Route覆盖且保留A记录，只移除该route即可回到原源站。发布后补充具体部署版本及回退入口。
