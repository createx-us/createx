# 03 — 角色到申请的连续路径

目标：保留用户选择的角色，避免每次默认成为创始成员。

改动：五个角色入口增加明确的role数据，点击后同步本地申请下拉并定位申请区域。两语言使用同一角色序号。

验收：真实Chrome点击英文Advisor入口；URL为/en/join/#application，下拉实际选中Advisor、value=1；语言链接保留#application。完整npm run check通过。

缺口：无JavaScript时手机导航和本地申请边界需增强；下一轮处理无JS可靠性。
