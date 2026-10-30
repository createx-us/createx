export type Language = "en" | "zh";
export type Page =
  | ""
  | "practice"
  | "chapters"
  | "join"
  | "partners"
  | "governance"
  | "resources";
export const pages: Page[] = [
  "",
  "practice",
  "chapters",
  "join",
  "partners",
  "governance",
  "resources",
];
export const languages: Language[] = ["en", "zh"];
export const copy = {
  en: {
    lang: "en",
    other: "中文",
    skip: "Skip to content",
    menu: "Menu",
    close: "Close menu",
    join: "Build with us",
    explore: "Explore the practice",
    nav: [
      "Home",
      "The practice",
      "City chapters",
      "Join CreateX",
      "Partnerships",
      "Governance",
      "Resources",
    ],
    title: "AI × Design Thinking.\nReal change, together.",
    eyebrow: "AI × DESIGN THINKING / LOCAL COMMUNITIES",
    description:
      "Education is changing. Work is changing. Our communities need ways to respond together. CreateX combines human-centered design thinking with AI to understand real needs, prototype ideas, and test solutions through local workshops and projects.",
    heroNote:
      "Human-centered questions. AI-assisted exploration. Real-world evidence.",
    mapCaption: "A possible network, built through local trust.",
    mapNote: "Concept illustration · not a map of active chapters",
    whyLabel: "01 / WHY WE EXIST",
    whyTitle: "The AI era changes how we learn,\nwork, and live together.",
    whyText:
      "AI expands what we can make. Progress still depends on our ability to ask better questions, think together, and test ideas in the real world. CreateX is a place to practice that—across disciplines, organizations, and cities.",
    principles: [
      [
        "Start with a real need",
        "Listen to the people closest to a problem before choosing a solution.",
      ],
      [
        "Create across boundaries",
        "Bring local knowledge, design, technology, and lived experience into the same room.",
      ],
      [
        "Leave something useful",
        "Turn learning into prototypes, reusable methods, and evidence others can build on.",
      ],
    ],
    howLabel: "02 / THE PRACTICE",
    howTitle: "A workshop is a beginning.",
    howText:
      "A repeatable rhythm connects a first conversation to work that can be tested, shared, and improved.",
    homeSteps: [
      [
        "Frame a challenge",
        "A specific need. A real person. A question worth exploring.",
      ],
      [
        "Make together",
        "Cross-disciplinary teams use design thinking, with AI as a collaborator.",
      ],
      [
        "Test in the world",
        "Promising outcomes can become 4–8 week action-learning projects.",
      ],
      [
        "Share what works",
        "Authorized cases and methods return to the next cycle of practice.",
      ],
    ],
    cityLabel: "03 / LOCAL ROOTS, SHARED LEARNING",
    cityTitle: "The city is the starting point.\nConnection is the multiplier.",
    cityText:
      "Local chapters shape their own questions and relationships. A shared network is designed to support methods, quality, and learning across places.",
    vision: "Our long-term vision",
    visionTitle: "1,000 cities.\n1,000 autonomous communities.",
    visionNote: "An ambition to work toward—not our current footprint.",
    cityLink: "How a chapter can begin",
    rolesLabel: "04 / PEOPLE MAKE THE NETWORK",
    rolesTitle: "Find your way to contribute.",
    rolesText:
      "Start with a concrete task and mutual trust. A title comes after the work, not before it.",
    roles: [
      [
        "Founding member / Core Team",
        "Build the methods, operations, product, or shared foundations.",
        "Agree a focused 30-day building task.",
      ],
      [
        "Advisor",
        "Contribute expertise in methods, an industry, governance, or international collaboration.",
        "Define a question, time commitment, and useful deliverable.",
      ],
      [
        "City chapter lead",
        "Connect local needs, people, facilitators, and partners.",
        "Develop a needs brief and a first pilot plan.",
      ],
      [
        "Project partner",
        "Bring a real setting, specialist capability, content, or space.",
        "Scope a joint project with clear responsibilities.",
      ],
      [
        "Enterprise sponsor",
        "Support practical learning, community innovation, or public outcomes.",
        "Agree purpose, resources, evidence, and data boundaries.",
      ],
    ],
    viewRoles: "Explore roles & prepare an application",
    ctaTitle: "Bring a question.\nLet’s make a beginning.",
    ctaText:
      "You do not need to have all the answers. Start with a real challenge and something you can contribute.",
    footerText:
      "A decentralized innovation culture & practice network for the AI era.",
    footerNote:
      "Built around real work, shared learning, and local responsibility.",
    rights: "CreateX · Ideas into practice.",
    status:
      "Public information · design and operating proposals are identified as such.",
    practiceTitle: "From a question\nto something that works.",
    practiceIntro:
      "Workshop OS is the repeatable practice at the heart of CreateX. Design thinking provides the rhythm. AI helps us explore. Real people and evidence keep us grounded.",
    workshopSteps: [
      [
        "Define the challenge",
        "Listen, observe, and write a challenge statement that can be validated.",
        "Output: a clear need, affected people, and the assumption to test.",
      ],
      [
        "Recruit & form a team",
        "Bring complementary perspectives together and clarify facilitation and review.",
        "Output: a team with roles, constraints, and a shared goal.",
      ],
      [
        "Run the workshop",
        "Empathize, define, ideate, prototype, and validate; use AI as a collaborator.",
        "Output: a prototype or action concept with first feedback.",
      ],
      [
        "Extend into a project",
        "Promising outcomes may enter a 4–8 week action-learning project when ownership and resources are clear.",
        "Output: a project brief, milestones, and a definition of done.",
      ],
      [
        "Make knowledge reusable",
        "Document authorized cases, templates, prompts, or evaluation materials.",
        "Output: a reusable asset with authorship and permission.",
      ],
      [
        "Review & improve",
        "Compare the result with the original goal, capture evidence, and revise the method.",
        "Output: a short retrospective and a next decision.",
      ],
    ],
    projectTitle: "4–8 weeks to learn by doing.",
    projectText:
      "This is a proposed extension for promising workshop outcomes, not a promise that every workshop becomes a project. Before starting, confirm a real need, an accountable owner, available effort, and agreed acceptance criteria.",
    projectStages: [
      ["Align", "Problem, permission, scope, and ownership."],
      ["Prototype", "A small test of the most important assumption."],
      [
        "Validate",
        "User feedback and evidence, with room to change direction.",
      ],
      [
        "Hand over",
        "A usable outcome, a retrospective, and agreed next steps.",
      ],
    ],
    doneTitle: "What counts as progress?",
    doneText:
      "A useful result can be a tested prototype, a decision informed by evidence, or a method someone else can reuse. Judge it against an agreed definition of done—not the size of the audience or the polish of a presentation.",
    chaptersTitle: "Build from your city.\nLearn across the network.",
    chaptersIntro:
      "A city chapter starts with people willing to take responsibility for a local problem. The aim is a small, reliable practice that can grow through evidence.",
    chapterFunctions: [
      [
        "Local direction",
        "Connect needs and partners; own delivery and reputation.",
      ],
      [
        "Workshop & facilitation",
        "Frame challenges, support delivery quality, and develop facilitators.",
      ],
      [
        "Community & operations",
        "Recruit, support participants, document learning, and follow through.",
      ],
    ],
    chapterFunctionsNote:
      "Three functions, not necessarily three people. Responsibilities and backup support should be explicit.",
    launchTitle: "A 90-day pilot,\nnot an expansion promise.",
    launchIntro:
      "An operating suggestion from the recruitment pack. Adapt it to local resources and confirm authorization before using it.",
    launch: [
      [
        "Days 1–15",
        "Listen & organize",
        "Interview people, choose a challenge, clarify roles and authorization.",
        "Evidence: needs brief, responsible people, and risk list.",
      ],
      [
        "Days 16–30",
        "Run a small pilot",
        "Rehearse or run one bounded workshop and review the cost and feedback.",
        "Evidence: process record, prototype, budget, and retrospective.",
      ],
      [
        "Days 31–60",
        "Improve & extend",
        "Revise the method and assess whether a real project is ready.",
        "Evidence: two versions, participant feedback, and a project brief.",
      ],
      [
        "Days 61–90",
        "Review the decision",
        "Evaluate outcomes and decide to continue, narrow, pause, or stop.",
        "Evidence: accepted work, contribution records, and a handover plan.",
      ],
    ],
    startupTitle: "Before a public pilot",
    startup: [
      "A real need and a defined group of participants",
      "Clear responsibilities and backup contacts",
      "An available venue, tools, and a realistic budget",
      "Confirmed contracting, payment, and safety responsibilities",
      "Permission for data, outcomes, and a feedback process",
    ],
    autonomyTitle: "Autonomy comes with responsibility.",
    autonomyText:
      "Local choice of topics and delivery does not automatically grant the right to sign contracts, collect fees, sublicense a brand, or make cross-city commitments. A chapter lead title does not confer equity, agency, or territorial exclusivity. Confirm scope, limits, duration, and withdrawal in writing.",
    joinTitle: "Start with a contribution.\nBuild trust through practice.",
    joinIntro:
      "Choose the role that fits what you can responsibly contribute today. The first step is a bounded task, a clear outcome, and a conversation about expectations.",
    firstTask: "A possible first task",
    prepare: "Prepare your interest note",
    formTitle: "Make a local application draft.",
    formIntro:
      "This tool creates a text file on your device. No application is sent or stored by this site. A receiving channel has not yet been connected: share your draft only after confirming a channel with a CreateX organizer you already know.",
    fields: {
      role: "Role of interest",
      city: "City / time zone",
      time: "Time you can commit",
      challenge: "A real challenge you want to work on",
      evidence: "Relevant experience or evidence",
      support: "Support you would need",
    },
    placeholders: {
      city: "Your city and time zone",
      time: "For example: 3 hours each week",
      challenge: "Who needs help, and what would you like to test?",
      evidence: "A short example or a public work link",
      support: "Skills, people, space, or other support",
    },
    download: "Generate my draft",
    draftSave: "Save draft as text file",
    reset: "Clear fields",
    formSuccess: "Your draft is ready to download. It has not been sent.",
    formError: "Complete the required fields before generating your draft.",
    privacy:
      "Local only. This site does not upload your entries or use persistent browser storage. Clear the fields when you finish, especially on a shared device. Do not include sensitive personal or customer data.",
    fallback: "Prefer a blank template?",
    template: "Download the application template",
    required: "Required",
    joinBoundary:
      "An application or trial does not automatically create an employment, certification, equity, agency, token, or investment relationship. Agree scope, compensation or voluntary status, permissions, and an exit plan before starting.",
    partnersTitle: "Bring a real challenge.\nBuild a shared outcome.",
    partnersIntro:
      "Organizations can contribute questions, settings, expertise, space, or resources. Start with one useful pilot, then decide together what should come next.",
    partnerTypes: [
      [
        "Enterprises & institutions",
        "Explore a challenge workshop, AI and design-thinking capability, or a prototype project.",
        "Confirm a problem owner, access to real users, data permission, and acceptance criteria.",
      ],
      [
        "Universities & professional communities",
        "Connect practice projects, mentor exchange, and method development.",
        "Confirm learning or research boundaries, participant protection, and outcome licenses.",
      ],
      [
        "Space & resource partners",
        "Support a workshop with venues, equipment, tools, or specialist services.",
        "Confirm availability, safety responsibilities, costs, and cancellation arrangements.",
      ],
      [
        "Sponsors & public-interest partners",
        "Support talent practice, public challenges, or reusable learning assets.",
        "Confirm use of resources, acknowledgement, independence, and disclosure.",
      ],
    ],
    sponsorTitle: "Support the practice.\nRespect the people.",
    sponsorText:
      "Sponsorship should fund a defined purpose and an outcome that can be reviewed. It does not buy participant personal data or control over independent findings. We do not promise funding, commercial success, audience size, or a guaranteed return.",
    partnerChecklistTitle: "A good collaboration brief covers",
    partnerChecklist: [
      "The challenge, intended beneficiaries, and project owner",
      "Deliverables, timing, dependencies, and acceptance criteria",
      "Cash, in-kind resources, costs, and payment conditions",
      "Data use, intellectual property, licensing, and publication permission",
      "Brand acknowledgement, conflicts, changes, exit, and dispute process",
    ],
    governanceTitle: "Shared ambition.\nClear responsibility.",
    governanceIntro:
      "Decentralization is a direction for organizational design. It should strengthen trust and accountability as the network grows. It is not a reason to leave financial, safety, or delivery responsibilities undefined.",
    governanceLayers: [
      [
        "Core operations",
        "The V1.2 design places day-to-day operations, brand, compliance, and coordination here.",
      ],
      [
        "Council",
        "A proposed layer for strategic oversight, major decisions, budgets, and risk review.",
      ],
      [
        "Community governance",
        "A proposed path toward participation in rules and shared resource decisions.",
      ],
    ],
    governanceState:
      "These are whitepaper design proposals. This site does not assert that a foundation, elected council, arbitration committee, token, or voting platform is already operational.",
    governanceProcess: "Propose → Discuss → Decide → Deliver → Review",
    governanceProcessText:
      "A useful proposal makes its goal, budget, milestones, acceptance criteria, and risks clear. Implementation should follow valid authority, with an evidence-based review.",
    tokenTitle: "CTX & CRED: proposals, not an offer.",
    tokenText:
      "The whitepaper explores CTX for governance and treasury decisions, and CRED for operational points or usage rights. This does not establish issuance, tradability, redemption, equity, or a personal entitlement. This site offers no token purchase, fundraising, or guaranteed return. Any implementation requires separate authorization and applicable compliance review.",
    ecosystemTitle: "Connected by practice.\nIndependent in responsibility.",
    ecosystemText:
      "CreateX, BoardX, and ShareX are peer projects. The design explores visual collaboration with BoardX and content distribution with ShareX through standards and interfaces. It does not establish a parent–subsidiary relationship, shared guarantee, cross-project agency, or dependency on a single platform.",
    contributionTitle: "Contribution needs evidence.",
    contributionText:
      "Delivery, reusable assets, ecosystem development, and public goods are the four contribution categories in V1.2. Records should show the work, its author, acceptance, permission, and reuse. Hours alone do not establish value, and a record does not automatically grant compensation, tokens, or governance rights.",
    resourcesTitle: "Useful things\nfor the next conversation.",
    resourcesIntro:
      "Public reading notes and practical templates to help you frame a challenge, explore a role, or prepare a collaboration. These are informational resources, not contracts or ready-to-sign legal documents.",
    resources: [
      [
        "CreateX public overview",
        "Positioning, practice, participation, and important boundaries.",
      ],
      [
        "Application template",
        "A simple interest note for a role and a first contribution.",
      ],
      [
        "Chapter pilot checklist",
        "Suggested responsibilities, launch checks, and a 90-day review.",
      ],
      [
        "Collaboration brief",
        "Questions for a workshop, project partnership, or sponsorship.",
      ],
    ],
    resourceFormat: "TXT · English",
    resourceDownload: "Download",
    faqTitle: "Questions worth asking.",
    faq: [
      [
        "Is CreateX a course or an event?",
        "Its intended model is a continuing practice network. Workshops are the smallest value unit, with promising outcomes extending into projects and reusable assets. Specific services and availability must be confirmed for each activity.",
      ],
      [
        "Where are the chapters?",
        "1,000 cities and 1,000 autonomous communities are a long-term vision. This site does not publish an unverified chapter directory or claim that this footprint already exists.",
      ],
      [
        "Can I join without a city team?",
        "Yes—prepare a role interest note around a concrete contribution. Confirm the available opportunity and organizer before treating an application as accepted.",
      ],
      [
        "Does a founding title give me equity?",
        "No. Founding and chapter titles describe possible operating roles. Equity, employment, agency, licensing, compensation, and governance participation require their own valid arrangements.",
      ],
      [
        "Can I buy CTX or CRED here?",
        "No. They are whitepaper mechanism proposals, not an investment product offered by this site. There is no token sale, promised return, or automatic entitlement.",
      ],
      [
        "How do I send my application?",
        "Download a draft or blank template. This site has no verified receiving channel connected. Confirm one with an organizer you already know before sending; downloading does not submit an application.",
      ],
      [
        "Where are the agreements and full whitepaper?",
        "Source documents are maintained in the project archive. The V1.2 source is an internal strategy version, and agreement drafts contain unresolved fields. This public site provides reviewed summaries instead of publishing them as executable legal documents.",
      ],
    ],
    sourceNote:
      "Content basis: CreateX Whitepaper V1.2 and Recruitment & Co-building Pack V0.1 (2026-10-29). Public summaries distinguish ambitions and proposals from verified operations.",
    notFoundTitle: "This path hasn’t been built yet.",
    notFoundText:
      "The page may have moved, or the address may be incomplete. Find your way back to the practice.",
    home: "Back to the beginning",
  },
  zh: {
    lang: "zh-CN",
    other: "EN",
    skip: "跳至正文",
    menu: "菜单",
    close: "关闭菜单",
    join: "一起共建",
    explore: "了解实践方式",
    nav: [
      "首页",
      "创新实践",
      "城市社区",
      "加入 CreateX",
      "伙伴合作",
      "治理与边界",
      "资料与问答",
    ],
    title: "AI × 设计思维，\n共解身边的真实问题。",
    eyebrow: "AI × DESIGN THINKING / 本地社区",
    description:
      "AI 正在改变教育、工作与社区生活。CreateX 将以人为本的设计思维与 AI 融合，让不同背景的人在本地相遇：理解真实需要、共同制作原型，并在工作坊和项目中验证解决方案。",
    heroNote: "以人的需要为起点，以 AI 辅助探索，以真实反馈验证。",
    mapCaption: "让本地的信任，连接更远的可能。",
    mapNote: "网络概念示意 · 不代表已开通城市",
    whyLabel: "01 / 为什么需要 CREATE X",
    whyTitle: "面对 AI 时代的变化，\n一起学习、工作与解决问题。",
    whyText:
      "教育需要重新思考学什么、怎样学；工作需要重新分配人与 AI 的任务；社区需要让技术回应真实生活。设计思维帮助我们理解人的需要和判断价值，AI 帮助探索、整理和快速制作原型，真实反馈决定下一步。",
    principles: [
      ["从真实需要出发", "先倾听与问题最接近的人，再决定采用什么方案。"],
      [
        "让不同视角相遇",
        "把本地经验、设计、技术与亲身感受带进同一个协作现场。",
      ],
      [
        "留下可以复用的成果",
        "把学习变成原型、方法与证据，让下一位实践者能够接着往前走。",
      ],
    ],
    howLabel: "02 / 我们如何实践",
    howTitle: "一场工作坊，\n是起点。",
    howText:
      "用可重复的实践节奏，把一次交流连接成可以验证、分享、持续改进的行动。",
    homeSteps: [
      ["定义真实问题", "找到具体需要、真实对象，以及值得探索的问题。"],
      ["跨界共同创造", "不同背景的小队，以设计思维推进，让 AI 成为协作者。"],
      ["在真实世界验证", "高潜成果可延伸为 4–8 周行动学习项目。"],
      ["让经验回到网络", "经授权的案例与方法，成为下一轮实践的起点。"],
    ],
    cityLabel: "03 / 扎根本地，连接彼此",
    cityTitle: "从一座城市出发，\n让共同学习放大价值。",
    cityText:
      "城市社区自主选择本地议题，建立真实关系。共同网络的设计方向，是用方法、质量标准与跨城学习支持持续实践。",
    vision: "我们的长期愿景",
    visionTitle: "1000 座城市，\n1000 个自治社区。",
    visionNote: "这是努力的方向，不是已经实现的规模。",
    cityLink: "了解城市社区如何开始",
    rolesLabel: "04 / 人，让网络发生",
    rolesTitle: "找到你的共建方式。",
    rolesText:
      "先完成一件具体的事，再建立长期信任。角色来自承担，而不只是一个称谓。",
    roles: [
      [
        "创始成员 / Core Team",
        "共建方法、运营、产品或网络的基础能力。",
        "约定一个聚焦的 30 天建设任务。",
      ],
      [
        "Advisor 顾问",
        "贡献方法、行业、治理或国际协作的专业经验。",
        "明确咨询问题、时间投入和有用的交付物。",
      ],
      [
        "城市社区创始人",
        "连接本地需要、参与者、引导师与伙伴。",
        "完成需求简报和首个试点计划。",
      ],
      [
        "项目合作伙伴",
        "提供真实场景、专业能力、内容或空间。",
        "界定一个分工清晰的联合项目。",
      ],
      [
        "企业赞助方",
        "支持人才实践、社区创新或公共成果。",
        "确认用途、资源、验收证据与数据边界。",
      ],
    ],
    viewRoles: "了解角色，准备加入意向",
    ctaTitle: "带着一个问题，\n一起开始。",
    ctaText: "不必已经拥有所有答案。从真实议题，以及你愿意贡献的那一部分开始。",
    footerText: "面向 AI 时代的去中心化创新文化与实践网络。",
    footerNote: "以真实交付、共同学习和本地责任为基础。",
    rights: "CreateX · 让想法进入实践。",
    status: "公开项目信息 · 愿景、机制与运营建议均注明性质。",
    practiceTitle: "从一个问题，\n到可验证的成果。",
    practiceIntro:
      "Workshop OS 是 CreateX 的可重复实践路径。设计思维提供节奏，AI 帮助探索，而真实的人与证据让行动始终有据可依。",
    workshopSteps: [
      [
        "定义问题",
        "通过倾听与观察，形成可以验证的问题陈述。",
        "产出：明确需要、受影响的人，以及待验证的假设。",
      ],
      [
        "招募与组队",
        "让互补的视角相遇，明确引导与评审职责。",
        "产出：角色清晰、理解限制并拥有共同目标的小队。",
      ],
      [
        "工作坊共创",
        "共情、定义、创意、原型、验证，让 AI 作为协作者参与。",
        "产出：带有首轮反馈的原型或行动构想。",
      ],
      [
        "延伸为项目",
        "负责人和资源明确后，高潜成果可进入 4–8 周行动学习项目。",
        "产出：项目任务书、阶段目标与完成定义。",
      ],
      [
        "沉淀可复用资产",
        "整理已获授权的案例、模板、Prompt 或评测材料。",
        "产出：作者与使用许可清楚的知识资产。",
      ],
      [
        "复盘与改进",
        "把实际结果与原目标对照，保留证据并修订方法。",
        "产出：简短复盘与下一步决定。",
      ],
    ],
    projectTitle: "用 4–8 周，\n在行动中学习。",
    projectText:
      "这是高潜工作坊成果的设计延伸，不代表每场活动都会孵化项目。启动前，先确认真实需要、最终负责人、可投入资源与验收标准。",
    projectStages: [
      ["对齐", "确认问题、许可、范围与责任人。"],
      ["原型", "用小规模测试检验最重要的假设。"],
      ["验证", "听取用户反馈，用证据决定是否调整。"],
      ["交接", "留下可用成果、复盘与共同确认的下一步。"],
    ],
    doneTitle: "怎样才算有进展？",
    doneText:
      "有用的成果可以是经过测试的原型、由证据支持的决策，或者被别人实际复用的方法。用事先约定的完成定义验收，不以观众人数或演示的精致程度代替结果。",
    chaptersTitle: "扎根你的城市，\n连接共同的学习。",
    chaptersIntro:
      "城市社区，从愿意为一个本地问题承担责任的人开始。先建立小而可靠的实践，再根据真实证据决定如何成长。",
    chapterFunctions: [
      ["本地方向与伙伴", "连接需要与资源，对交付和声誉负责。"],
      ["工作坊与引导", "定义问题，支持交付质量与引导师成长。"],
      ["社区与运营", "招募、参与者服务、记录沉淀与持续跟进。"],
    ],
    chapterFunctionsNote:
      "三项职能不一定对应三个人；可以兼任，但要明确责任和备份支持。",
    launchTitle: "用 90 天验证，\n而不是承诺扩张。",
    launchIntro:
      "以下为招募文件包中的建议运营方案。应按本地资源调整，并在采用前确认实际授权。",
    launch: [
      [
        "第 1–15 天",
        "倾听与组织",
        "访谈需求，选择议题，明确职能与授权。",
        "验收证据：需求简报、责任人及风险清单。",
      ],
      [
        "第 16–30 天",
        "小范围试点",
        "进行内部演练或有边界的工作坊，核对成本与反馈。",
        "验收证据：流程、原型、预算及复盘。",
      ],
      [
        "第 31–60 天",
        "改进与延伸",
        "修订方法，判断真实项目是否具备启动条件。",
        "验收证据：两版方案、参与者反馈及任务书。",
      ],
      [
        "第 61–90 天",
        "复核与决定",
        "评估成果，决定继续、缩小范围、暂停或结束。",
        "验收证据：已验收成果、贡献记录和交接计划。",
      ],
    ],
    startupTitle: "公开试点前，先确认",
    startup: [
      "真实需要与明确的参与对象",
      "职能分工与备份联系人",
      "可用场地、工具与合理预算",
      "签约、收款及安全责任主体",
      "数据、成果授权与反馈处理路径",
    ],
    autonomyTitle: "自治，也意味着负责。",
    autonomyText:
      "本地议题和交付的自主选择，不自动包含签约、收款、品牌转授权或跨城承诺的权利。城市创始人称谓不赋予股权、代理权或区域独占权。范围、额度、期限和撤回机制，需要书面确认。",
    joinTitle: "从一次贡献开始，\n在实践中建立信任。",
    joinIntro:
      "选择当下能够承担的角色。第一步，是边界明确的任务、可以检验的成果，以及对彼此期待的坦诚交流。",
    firstTask: "可以先一起完成",
    prepare: "准备加入意向",
    formTitle: "在本地生成申请草稿。",
    formIntro:
      "工具仅在你的设备生成文本文件，不向网站发送或保存申请。当前尚未接入收件渠道：请先与已认识的 CreateX 组织者确认联系方式，再自行分享草稿。",
    fields: {
      role: "意向角色",
      city: "城市与时区",
      time: "可投入时间",
      challenge: "希望共同解决的真实问题",
      evidence: "相关经历与成果证据",
      support: "希望获得的支持",
    },
    placeholders: {
      city: "你所在的城市与时区",
      time: "例如：每周 3 小时",
      challenge: "谁遇到了什么需要？你想验证什么？",
      evidence: "简述经历，或提供公开作品链接",
      support: "技能、伙伴、空间或其他支持",
    },
    download: "生成申请草稿",
    draftSave: "保存草稿文本文件",
    reset: "清空内容",
    formSuccess: "申请草稿已生成，可下载保存；尚未发送。",
    formError: "请先填写必填项，再生成申请草稿。",
    privacy:
      "仅在本地处理。网站不会上传填写内容或使用浏览器持久存储。完成后请清空内容，尤其是在共享设备上。请勿填写敏感个人信息或客户资料。",
    fallback: "希望先使用空白模板？",
    template: "下载申请模板",
    required: "必填",
    joinBoundary:
      "申请或试运行不自动形成雇佣、认证、股权、代理、代币或投资关系。开始前应确认范围、报酬或志愿性质、许可与退出安排。",
    partnersTitle: "带来一个真实议题，\n共建一份有用成果。",
    partnersIntro:
      "机构可以提供问题、场景、专业能力、空间或资源。先完成一个有价值的试点，再共同决定下一步。",
    partnerTypes: [
      [
        "企业与机构",
        "围绕真实议题开展工作坊、AI 与设计思维能力建设或原型项目。",
        "确认问题负责人、真实用户、数据授权与验收标准。",
      ],
      [
        "高校与专业社群",
        "连接实践项目、导师交流与方法共建。",
        "确认教学或研究边界、参与者保护与成果许可。",
      ],
      [
        "场地与资源伙伴",
        "为实践提供空间、设备、工具或专业服务。",
        "确认可用时间、安全责任、费用与取消安排。",
      ],
      [
        "赞助与公益伙伴",
        "支持人才实践、公共议题或可复用的学习资产。",
        "确认资源用途、署名、独立性与披露要求。",
      ],
    ],
    sponsorTitle: "支持实践，\n尊重每一位参与者。",
    sponsorText:
      "赞助应对应清晰用途与可以复核的成果。它不能购买参与者个人数据，也不当然控制独立结论。我们不保证融资、商业成功、曝光数量或投资回报。",
    partnerChecklistTitle: "一份好的合作需求简表应包含",
    partnerChecklist: [
      "议题、受益对象和项目负责人",
      "交付物、时间、依赖条件与验收标准",
      "现金、实物、成本及付款条件",
      "数据使用、知识产权、许可和公开授权",
      "品牌署名、利益冲突、变更、退出与争议处理",
    ],
    governanceTitle: "共同的愿景，\n清晰的责任。",
    governanceIntro:
      "去中心化是一种组织设计方向。网络成长，应让信任与问责更扎实，而不是让财务、安全和交付责任悬空。",
    governanceLayers: [
      ["核心运营", "V1.2 设计中承担日常运营、品牌、合规与跨区域协调。"],
      ["理事会", "拟承担战略监督、重大事项、预算和风险审议。"],
      ["社区治理", "探索参与共同规则与公共资源决策的路径。"],
    ],
    governanceState:
      "以上为白皮书设计方案。本站不据此宣称基金会、选举理事会、仲裁委员会、代币或投票系统已经成立或上线。",
    governanceProcess: "提案 → 讨论 → 决策 → 交付 → 复盘",
    governanceProcessText:
      "有用的提案应写清目标、预算、里程碑、验收标准与风险。实施依有效授权推进，并以真实证据复盘。",
    tokenTitle: "CTX 与 CRED：机制提案。",
    tokenText:
      "白皮书探索 CTX 的治理与国库用途，以及 CRED 的运营积分或使用权用途。这不证明已发行、可交易、可兑付，也不构成股权或个人权益授予。本站不提供代币认购、募集资金或收益保证。实际实施需要另行完成授权与适用的合规审查。",
    ecosystemTitle: "在实践中协同，\n在责任上独立。",
    ecosystemText:
      "CreateX、BoardX、ShareX 是 peer 生态项目。设计上探索通过标准与接口，与 BoardX 的可视化协作、ShareX 的内容分发连接。不当然形成母子公司、共同担保或跨项目代理，也不依赖单一平台。",
    contributionTitle: "贡献，要有证据。",
    contributionText:
      "V1.2 将贡献分为交付、资产、生态与公共物品。记录应写明成果、作者、验收、许可和复用情况。工时不单独决定价值，记录也不自动兑换报酬、代币或治理权。",
    resourcesTitle: "为下一次交流，\n准备一些有用的东西。",
    resourcesIntro:
      "公开阅读摘要与实用模板，帮助你定义问题、探索角色或准备合作。这些是信息资料，不是合同，也不是可以直接签署的法律文件。",
    resources: [
      ["CreateX 公开介绍", "定位、实践方式、参与路径与重要边界。"],
      ["加入意向申请模板", "围绕意向角色与首个贡献，整理一份简明草稿。"],
      ["城市试点检查清单", "建议职能、启动检查与 90 天复核。"],
      ["合作需求简表", "为工作坊、项目合作或赞助准备讨论。"],
    ],
    resourceFormat: "TXT · 中文",
    resourceDownload: "下载",
    faqTitle: "值得先问清楚的问题。",
    faq: [
      [
        "CreateX 是课程，还是活动？",
        "设计方向是持续的实践网络。工作坊是最小价值单元，高潜成果可延伸为项目与可复用资产。具体活动与服务是否可用，需要逐项确认。",
      ],
      [
        "现在有哪些城市社区？",
        "1000 座城市、1000 个自治社区是长期愿景。本站不公布未经核实的城市名录，也不宣称已经达成这一规模。",
      ],
      [
        "没有本地团队，也可以参与吗？",
        "可以先围绕具体贡献准备角色意向。在把申请视为已接受前，请先确认机会是否可用以及实际组织者。",
      ],
      [
        "创始人称谓会带来股权吗？",
        "不会。创始成员与城市创始人是可能的运营角色。股权、雇佣、代理、许可、报酬和治理参与，需要各自有效的安排。",
      ],
      [
        "可以在这里购买 CTX 或 CRED 吗？",
        "不可以。它们是白皮书机制提案，本站不提供投资产品、代币销售、收益承诺或自动分配权益。",
      ],
      [
        "如何提交申请？",
        "先下载草稿或空白模板。当前网站尚未接入经核实的收件渠道，请与已认识的组织者确认后自行发送。下载不等于提交。",
      ],
      [
        "在哪里查看协议和完整白皮书？",
        "源文档集中保留在项目资料归档中。V1.2 原件是内部战略版本，协议草案也有待填字段。官网提供经过整理的公开摘要，不将草案发布为可直接执行的法律文件。",
      ],
    ],
    sourceNote:
      "内容依据：CreateX 白皮书 V1.2 与招募共建文件包 V0.1（2026-10-29）。公开摘要区分愿景、设计方案与实际运营。",
    notFoundTitle: "这条路，还没有铺好。",
    notFoundText:
      "页面可能已移动，或地址尚不完整。回到起点，重新探索共创的可能。",
    home: "返回首页",
  },
} as const;
