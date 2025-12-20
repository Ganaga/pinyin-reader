// Built-in Chinese phrases organized by HSK level with dialogues
const BUILT_IN_PHRASES = {
    "hsk1": {
        "title": "HSK 1 - Dialogues débutants",
        "icon": "📘",
        "phrases": [
            { zh: "你好！我叫李明。你叫什么名字？", fr: "Bonjour ! Je m'appelle Li Ming. Comment tu t'appelles ?", en: "Hello! My name is Li Ming. What's your name?" },
            { zh: "我也很好，谢谢。你是学生吗？", fr: "Je vais bien aussi, merci. Es-tu étudiant ?", en: "I'm fine too, thank you. Are you a student?" },
            { zh: "这是我的书。那是你的书吗？", fr: "C'est mon livre. Est-ce que c'est ton livre ?", en: "This is my book. Is that your book?" },
            { zh: "我有三个苹果。你想要一个吗？", fr: "J'ai trois pommes. Tu en veux une ?", en: "I have three apples. Do you want one?" },
            { zh: "今天星期几？今天星期三。", fr: "Quel jour sommes-nous ? Nous sommes mercredi.", en: "What day is it? It's Wednesday." },
            { zh: "现在几点？现在十点。", fr: "Quelle heure est-il ? Il est dix heures.", en: "What time is it? It's ten o'clock." },
            { zh: "你喜欢喝茶还是咖啡？我喜欢喝茶。", fr: "Tu aimes le thé ou le café ? J'aime le thé.", en: "Do you like tea or coffee? I like tea." },
            { zh: "你在哪里工作？我在学校工作。", fr: "Où travailles-tu ? Je travaille à l'école.", en: "Where do you work? I work at school." },
            { zh: "你会说中文吗？会一点儿。", fr: "Parles-tu chinois ? Un petit peu.", en: "Do you speak Chinese? A little bit." },
            { zh: "你的爸爸妈妈好吗？他们都很好。", fr: "Tes parents vont bien ? Ils vont tous bien.", en: "Are your parents well? They are all well." },
            { zh: "你想吃什么？我想吃米饭。", fr: "Qu'est-ce que tu veux manger ? Je veux manger du riz.", en: "What do you want to eat? I want to eat rice." },
            { zh: "今天天气怎么样？今天天气很好。", fr: "Quel temps fait-il aujourd'hui ? Il fait beau aujourd'hui.", en: "How's the weather today? The weather is nice today." },
            { zh: "你家有几口人？我家有四口人。", fr: "Combien de personnes dans ta famille ? Il y a quatre personnes dans ma famille.", en: "How many people in your family? There are four people in my family." },
            { zh: "这件衣服多少钱？五十块钱。", fr: "Combien coûte ce vêtement ? Cinquante yuans.", en: "How much is this clothing? Fifty yuan." },
            { zh: "你能看见那只猫吗？能，我看见了。", fr: "Peux-tu voir ce chat ? Oui, je le vois.", en: "Can you see that cat? Yes, I can see it." }
        ]
    },
    "hsk2": {
        "title": "HSK 2 - Dialogues élémentaires",
        "icon": "📗",
        "phrases": [
            { zh: "你昨天去哪儿了？我去超市买东西了。", fr: "Où es-tu allé hier ? Je suis allé au supermarché faire des courses.", en: "Where did you go yesterday? I went to the supermarket to shop." },
            { zh: "你每天几点起床？我每天早上七点起床。", fr: "À quelle heure te lèves-tu chaque jour ? Je me lève à sept heures chaque matin.", en: "What time do you get up every day? I get up at seven every morning." },
            { zh: "外面正在下雨，你要带伞吗？好的，谢谢提醒。", fr: "Il pleut dehors, veux-tu prendre un parapluie ? D'accord, merci de me le rappeler.", en: "It's raining outside, do you want to take an umbrella? Okay, thanks for reminding me." },
            { zh: "你觉得这部电影怎么样？我觉得很有意思。", fr: "Que penses-tu de ce film ? Je trouve ça très intéressant.", en: "What do you think of this movie? I find it very interesting." },
            { zh: "我们一起去打篮球，好吗？好啊，几点去？", fr: "Allons jouer au basket ensemble, d'accord ? D'accord, à quelle heure ?", en: "Let's go play basketball together, okay? Okay, what time?" },
            { zh: "这个汉字怎么读？请你再说一遍，好吗？", fr: "Comment se lit ce caractère ? Peux-tu répéter s'il te plaît ?", en: "How do you read this character? Can you say it again, please?" },
            { zh: "你的房间真干净！你每天都打扫吗？", fr: "Ta chambre est vraiment propre ! Tu la nettoies tous les jours ?", en: "Your room is really clean! Do you clean it every day?" },
            { zh: "我想去银行取钱。银行在哪儿？", fr: "Je veux aller à la banque retirer de l'argent. Où est la banque ?", en: "I want to go to the bank to withdraw money. Where is the bank?" },
            { zh: "你会游泳吗？会一点儿，但是游得不太好。", fr: "Sais-tu nager ? Un peu, mais je ne nage pas très bien.", en: "Can you swim? A little, but I don't swim very well." },
            { zh: "你为什么学习中文？因为我对中国文化很感兴趣。", fr: "Pourquoi apprends-tu le chinois ? Parce que je suis très intéressé par la culture chinoise.", en: "Why do you study Chinese? Because I'm very interested in Chinese culture." },
            { zh: "你吃过北京烤鸭吗？吃过，非常好吃。", fr: "As-tu déjà mangé du canard laqué de Pékin ? Oui, c'est délicieux.", en: "Have you eaten Peking duck? Yes, it's very delicious." },
            { zh: "火车站离这儿远吗？不太远，坐地铁十分钟就到了。", fr: "La gare est-elle loin d'ici ? Pas très loin, dix minutes en métro.", en: "Is the train station far from here? Not very far, ten minutes by subway." },
            { zh: "你的中文说得真好！是在哪儿学的？", fr: "Tu parles vraiment bien chinois ! Où l'as-tu appris ?", en: "You speak Chinese really well! Where did you learn it?" },
            { zh: "我想给妈妈买一件礼物。你有什么建议吗？", fr: "Je veux acheter un cadeau pour ma mère. As-tu des suggestions ?", en: "I want to buy a gift for my mother. Do you have any suggestions?" }
        ]
    },
    "hsk3": {
        "title": "HSK 3 - Dialogues intermédiaires",
        "icon": "📙",
        "phrases": [
            { zh: "你好像有点儿不舒服，怎么了？我昨晚没睡好，有点儿头疼。", fr: "Tu as l'air un peu mal à l'aise, qu'est-ce qui ne va pas ? Je n'ai pas bien dormi hier soir, j'ai un peu mal à la tête.", en: "You seem a bit uncomfortable, what's wrong? I didn't sleep well last night, I have a bit of a headache." },
            { zh: "听说你要去上海出差？对，下个星期去，大概要待三天。", fr: "J'ai entendu dire que tu vas à Shanghai en voyage d'affaires ? Oui, j'y vais la semaine prochaine, je vais y rester environ trois jours.", en: "I heard you're going to Shanghai on a business trip? Yes, next week, I'll stay for about three days." },
            { zh: "你能帮我检查一下这份报告吗？当然可以，我看看有没有错误。", fr: "Peux-tu m'aider à vérifier ce rapport ? Bien sûr, je vais voir s'il y a des erreurs.", en: "Can you help me check this report? Of course, I'll see if there are any errors." },
            { zh: "这个周末我们去爬山吧！太好了，但是天气预报说可能会下雨。", fr: "Allons faire de la randonnée ce week-end ! Super, mais la météo dit qu'il pourrait pleuvoir.", en: "Let's go hiking this weekend! Great, but the weather forecast says it might rain." },
            { zh: "你对这家新开的餐厅有什么看法？环境不错，但是价格有点儿贵。", fr: "Qu'est-ce que tu penses de ce nouveau restaurant ? L'ambiance est bien, mais les prix sont un peu chers.", en: "What do you think of this new restaurant? The atmosphere is nice, but the prices are a bit expensive." },
            { zh: "我已经申请了那个工作，但是还没有收到回复。别着急，再等等吧。", fr: "J'ai déjà postulé pour ce travail, mais je n'ai pas encore reçu de réponse. Ne t'inquiète pas, attends encore un peu.", en: "I've already applied for that job, but haven't received a reply yet. Don't worry, wait a bit longer." },
            { zh: "你打算怎么过春节？我打算回老家跟家人团聚。", fr: "Comment comptes-tu passer le Nouvel An chinois ? Je compte retourner dans ma ville natale pour me réunir avec ma famille.", en: "How do you plan to spend the Spring Festival? I plan to return to my hometown to reunite with my family." },
            { zh: "我发现学中文越来越难了。是啊，但是只要坚持练习就会进步的。", fr: "Je trouve que le chinois devient de plus en plus difficile. Oui, mais tant que tu continues à pratiquer, tu progresseras.", en: "I find Chinese getting harder and harder. Yes, but as long as you keep practicing, you'll improve." },
            { zh: "你最近在读什么书？我在读一本关于中国历史的书，特别有意思。", fr: "Quel livre lis-tu récemment ? Je lis un livre sur l'histoire chinoise, c'est particulièrement intéressant.", en: "What book are you reading recently? I'm reading a book about Chinese history, it's particularly interesting." },
            { zh: "我把钥匙忘在办公室里了。你可以用我的备用钥匙。", fr: "J'ai oublié mes clés au bureau. Tu peux utiliser mes clés de secours.", en: "I forgot my keys in the office. You can use my spare keys." },
            { zh: "你觉得应该先完成哪个项目？我建议先做比较紧急的那个。", fr: "Lequel projet penses-tu qu'on devrait terminer en premier ? Je suggère de faire celui qui est le plus urgent d'abord.", en: "Which project do you think we should finish first? I suggest doing the most urgent one first." },
            { zh: "这道菜的味道跟我在北京吃的不太一样。可能每个地方的做法都有点儿差别。", fr: "Ce plat a un goût différent de celui que j'ai mangé à Pékin. Peut-être que chaque endroit a sa propre façon de le préparer.", en: "This dish tastes different from what I ate in Beijing. Maybe each place has its own way of preparing it." }
        ]
    },
    "hsk4": {
        "title": "HSK 4 - Dialogues avancés",
        "icon": "📕",
        "phrases": [
            { zh: "你在这个公司工作多长时间了？已经五年了，时间过得真快。", fr: "Depuis combien de temps travailles-tu dans cette entreprise ? Ça fait déjà cinq ans, le temps passe vraiment vite.", en: "How long have you been working at this company? It's been five years already, time really flies." },
            { zh: "根据目前的情况来看，我们需要调整原来的计划。我同意，咱们重新讨论一下吧。", fr: "Selon la situation actuelle, nous devons ajuster le plan original. Je suis d'accord, rediscutons-en.", en: "According to the current situation, we need to adjust the original plan. I agree, let's discuss it again." },
            { zh: "你对这次会议的内容有什么建议吗？我觉得应该重点讨论预算问题。", fr: "As-tu des suggestions sur le contenu de cette réunion ? Je pense qu'on devrait se concentrer sur la question du budget.", en: "Do you have any suggestions about the content of this meeting? I think we should focus on the budget issue." },
            { zh: "听说你最近在准备考试？是的，我正在努力复习，希望能够通过。", fr: "J'ai entendu dire que tu te prépares à un examen récemment ? Oui, je révise assidûment, j'espère pouvoir réussir.", en: "I heard you're preparing for an exam recently? Yes, I'm studying hard, I hope to pass." },
            { zh: "这个问题比较复杂，我们应该从不同的角度来分析。你说得对，我们分别负责不同的部分吧。", fr: "Ce problème est assez complexe, nous devrions l'analyser sous différents angles. Tu as raison, chacun sera responsable d'une partie différente.", en: "This problem is quite complex, we should analyze it from different angles. You're right, let's each be responsible for different parts." },
            { zh: "尽管遇到了很多困难，但是他还是坚持把项目完成了。他的精神值得我们学习。", fr: "Malgré les nombreuses difficultés rencontrées, il a quand même persévéré et terminé le projet. Son esprit mérite qu'on s'en inspire.", en: "Despite encountering many difficulties, he still persisted and completed the project. His spirit is worth learning from." },
            { zh: "你能否介绍一下你们公司的主要业务？当然，我们主要从事软件开发和技术咨询。", fr: "Peux-tu présenter les activités principales de ton entreprise ? Bien sûr, nous sommes principalement engagés dans le développement logiciel et le conseil technique.", en: "Can you introduce your company's main business? Of course, we're mainly engaged in software development and technical consulting." },
            { zh: "我发现他的性格跟以前相比有了很大的变化。是啊，经历了那么多事情，人总会成长的。", fr: "J'ai remarqué que son caractère a beaucoup changé par rapport à avant. Oui, après avoir vécu tant de choses, on finit toujours par grandir.", en: "I've noticed his personality has changed a lot compared to before. Yes, after experiencing so much, people always grow." },
            { zh: "无论遇到什么困难，我们都不应该放弃自己的梦想。这句话说得太好了，我完全同意。", fr: "Quelles que soient les difficultés rencontrées, nous ne devrions pas abandonner nos rêves. C'est très bien dit, je suis entièrement d'accord.", en: "No matter what difficulties we encounter, we shouldn't give up on our dreams. That's very well said, I completely agree." },
            { zh: "这次旅行给我留下了深刻的印象，特别是当地人的热情好客。我也有同样的感受，下次还想再去。", fr: "Ce voyage m'a laissé une profonde impression, surtout l'hospitalité des habitants locaux. J'ai le même sentiment, j'aimerais y retourner la prochaine fois.", en: "This trip left a deep impression on me, especially the local people's hospitality. I have the same feeling, I'd like to go again next time." }
        ]
    },
    "hsk5": {
        "title": "HSK 5 - Dialogues supérieurs",
        "icon": "📔",
        "phrases": [
            { zh: "在当今社会，环境保护已经成为一个刻不容缓的问题。确实如此，我们每个人都应该承担起相应的责任。", fr: "Dans la société actuelle, la protection de l'environnement est devenue une question urgente. C'est vrai, chacun de nous devrait assumer ses responsabilités.", en: "In today's society, environmental protection has become an urgent issue. Indeed, each of us should take on corresponding responsibilities." },
            { zh: "据统计，近年来网络购物的用户数量呈现出快速增长的趋势。这种现象反映了人们消费习惯的重大变化。", fr: "Selon les statistiques, le nombre d'utilisateurs du commerce en ligne montre une tendance de croissance rapide ces dernières années. Ce phénomène reflète un changement majeur dans les habitudes de consommation.", en: "According to statistics, the number of online shopping users has shown a rapid growth trend in recent years. This phenomenon reflects a major change in consumption habits." },
            { zh: "在全球化的背景下，跨文化交流变得越来越重要。我认为，理解和尊重文化差异是成功交流的关键。", fr: "Dans le contexte de la mondialisation, les échanges interculturels deviennent de plus en plus importants. Je pense que comprendre et respecter les différences culturelles est la clé d'une communication réussie.", en: "In the context of globalization, cross-cultural communication is becoming increasingly important. I believe understanding and respecting cultural differences is the key to successful communication." },
            { zh: "他在演讲中强调了创新对企业发展的重要性。虽然创新伴随着风险，但是不创新就意味着落后。", fr: "Il a souligné dans son discours l'importance de l'innovation pour le développement des entreprises. Bien que l'innovation comporte des risques, ne pas innover signifie rester en arrière.", en: "He emphasized in his speech the importance of innovation for business development. Although innovation comes with risks, not innovating means falling behind." },
            { zh: "这篇文章从多个维度分析了教育改革的必要性。作者的观点很有说服力，值得深入思考。", fr: "Cet article analyse la nécessité de la réforme éducative sous plusieurs dimensions. Le point de vue de l'auteur est très convaincant et mérite une réflexion approfondie.", en: "This article analyzes the necessity of educational reform from multiple dimensions. The author's viewpoint is very persuasive and worth deep reflection." },
            { zh: "面对日益激烈的市场竞争，企业必须不断提高自身的核心竞争力。这不仅需要技术创新，还需要管理模式的优化。", fr: "Face à une concurrence de marché de plus en plus féroce, les entreprises doivent continuellement améliorer leur compétitivité centrale. Cela nécessite non seulement l'innovation technologique, mais aussi l'optimisation du modèle de gestion.", en: "Facing increasingly fierce market competition, companies must continuously improve their core competitiveness. This requires not only technological innovation but also optimization of management models." },
            { zh: "尽管人工智能技术发展迅速，但它在某些领域仍然无法完全取代人类的判断和创造力。", fr: "Bien que la technologie de l'intelligence artificielle se développe rapidement, elle ne peut toujours pas complètement remplacer le jugement et la créativité humains dans certains domaines.", en: "Although AI technology is developing rapidly, it still cannot completely replace human judgment and creativity in certain areas." },
            { zh: "这个项目的成功离不开团队成员之间的密切配合和有效沟通。我们应该总结经验，为今后的工作提供借鉴。", fr: "Le succès de ce projet dépend de la coopération étroite et de la communication efficace entre les membres de l'équipe. Nous devrions résumer l'expérience pour fournir une référence pour le travail futur.", en: "The success of this project depends on close cooperation and effective communication among team members. We should summarize the experience to provide reference for future work." }
        ]
    },
    "hsk6": {
        "title": "HSK 6 - Dialogues experts",
        "icon": "📓",
        "phrases": [
            { zh: "从历史的角度来看，任何一个文明的兴衰都与其制度创新能力密切相关。这一观点在当代社会依然具有重要的现实意义。", fr: "D'un point de vue historique, la montée et la chute de toute civilisation sont étroitement liées à sa capacité d'innovation institutionnelle. Ce point de vue a toujours une signification pratique importante dans la société contemporaine.", en: "From a historical perspective, the rise and fall of any civilization is closely related to its institutional innovation capability. This viewpoint still has important practical significance in contemporary society." },
            { zh: "近年来，随着科技的飞速发展，人们的生活方式发生了翻天覆地的变化。然而，我们也应该警惕技术进步可能带来的负面影响。", fr: "Ces dernières années, avec le développement rapide de la technologie, le mode de vie des gens a subi des changements radicaux. Cependant, nous devrions également être vigilants quant aux impacts négatifs potentiels du progrès technologique.", en: "In recent years, with the rapid development of technology, people's lifestyles have undergone radical changes. However, we should also be vigilant about potential negative impacts of technological progress." },
            { zh: "在探讨这个哲学问题时，我们不能忽视东西方思想传统的根本差异。只有在充分理解这些差异的基础上，才能进行真正有意义的对话。", fr: "En discutant de cette question philosophique, nous ne pouvons ignorer les différences fondamentales entre les traditions de pensée orientale et occidentale. Ce n'est qu'en comprenant pleinement ces différences que nous pouvons avoir un dialogue vraiment significatif.", en: "When discussing this philosophical question, we cannot ignore the fundamental differences between Eastern and Western thought traditions. Only by fully understanding these differences can we have truly meaningful dialogue." },
            { zh: "他的研究成果不仅在学术界引起了广泛关注，而且对相关产业的发展也产生了深远的影响。这充分体现了理论与实践相结合的重要性。", fr: "Ses résultats de recherche ont non seulement suscité une large attention dans le monde académique, mais ont également eu un impact profond sur le développement des industries connexes. Cela illustre pleinement l'importance de combiner théorie et pratique.", en: "His research results have not only attracted widespread attention in academia but also had a profound impact on the development of related industries. This fully demonstrates the importance of combining theory and practice." },
            { zh: "在全球化深入发展的今天，各国之间的相互依存日益加深。与此同时，保护本国文化特色和维护国家利益也变得愈发重要。如何在这两者之间找到平衡，是摆在我们面前的重大课题。", fr: "Alors que la mondialisation s'approfondit, l'interdépendance entre les pays s'intensifie. En même temps, protéger les caractéristiques culturelles nationales et défendre les intérêts nationaux devient de plus en plus important. Comment trouver un équilibre entre les deux est une question majeure devant nous.", en: "As globalization deepens, interdependence among countries intensifies. At the same time, protecting national cultural characteristics and defending national interests becomes increasingly important. How to find a balance between the two is a major issue before us." },
            { zh: "这部作品之所以能够经久不衰，在于它深刻揭示了人性的复杂性和矛盾性。作者通过细腻的心理描写，展现了人物内心世界的挣扎与困惑。", fr: "Si cette œuvre perdure, c'est parce qu'elle révèle profondément la complexité et les contradictions de la nature humaine. L'auteur, à travers des descriptions psychologiques subtiles, montre les luttes et confusions dans le monde intérieur des personnages.", en: "The reason this work endures is that it profoundly reveals the complexity and contradictions of human nature. Through subtle psychological descriptions, the author shows the struggles and confusions in the characters' inner worlds." },
            { zh: "从宏观经济学的视角分析，当前的通货膨胀压力主要源于供需失衡和流动性过剩。政府需要采取综合性的政策措施来应对这一挑战，既要稳定物价，又要促进经济增长。", fr: "D'un point de vue macroéconomique, la pression inflationniste actuelle provient principalement du déséquilibre entre l'offre et la demande et de l'excès de liquidités. Le gouvernement doit adopter des mesures politiques globales pour relever ce défi, stabilisant à la fois les prix et favorisant la croissance économique.", en: "From a macroeconomic perspective, current inflationary pressure mainly stems from supply-demand imbalance and excess liquidity. The government needs to adopt comprehensive policy measures to address this challenge, both stabilizing prices and promoting economic growth." }
        ]
    },
    "quotidien": {
        "title": "Situations quotidiennes",
        "icon": "🏠",
        "phrases": [
            { zh: "早上好！你昨晚睡得好吗？", fr: "Bonjour ! As-tu bien dormi hier soir ?", en: "Good morning! Did you sleep well last night?" },
            { zh: "我去超市买点儿东西，你需要什么吗？", fr: "Je vais au supermarché acheter quelque chose, as-tu besoin de quelque chose ?", en: "I'm going to the supermarket to buy something, do you need anything?" },
            { zh: "今天下班后我们一起吃饭吧。好主意！去哪儿吃？", fr: "Mangeons ensemble après le travail aujourd'hui. Bonne idée ! Où allons-nous ?", en: "Let's eat together after work today. Good idea! Where shall we go?" },
            { zh: "你看完这本书了吗？可以借我看看吗？", fr: "As-tu fini de lire ce livre ? Peux-tu me le prêter ?", en: "Have you finished reading this book? Can you lend it to me?" },
            { zh: "外面太冷了，多穿点儿衣服再出去。", fr: "Il fait trop froid dehors, mets plus de vêtements avant de sortir.", en: "It's too cold outside, put on more clothes before going out." }
        ]
    },
    "urgence": {
        "title": "Situations d'urgence",
        "icon": "🚨",
        "phrases": [
            { zh: "救命！快来人帮帮我！", fr: "Au secours ! Quelqu'un, aidez-moi vite !", en: "Help! Someone, help me quickly!" },
            { zh: "我的钱包被偷了，请帮我报警。", fr: "Mon portefeuille a été volé, aidez-moi à appeler la police s'il vous plaît.", en: "My wallet was stolen, please help me call the police." },
            { zh: "我感觉不舒服，能送我去医院吗？", fr: "Je ne me sens pas bien, peux-tu m'emmener à l'hôpital ?", en: "I don't feel well, can you take me to the hospital?" },
            { zh: "请问最近的药店在哪里？我需要买药。", fr: "Où est la pharmacie la plus proche ? J'ai besoin d'acheter des médicaments.", en: "Where is the nearest pharmacy? I need to buy medicine." },
            { zh: "我的护照丢了，我应该去哪里补办？", fr: "J'ai perdu mon passeport, où dois-je aller pour en faire un nouveau ?", en: "I lost my passport, where should I go to get a new one?" }
        ]
    }
};

// Function to get all phrases as a flat array
function getAllPhrases() {
    const allPhrases = [];
    for (const categoryKey in BUILT_IN_PHRASES) {
        const category = BUILT_IN_PHRASES[categoryKey];
        category.phrases.forEach(phrase => {
            allPhrases.push({
                ...phrase,
                category: categoryKey,
                categoryTitle: category.title
            });
        });
    }
    return allPhrases;
}

// Function to search phrases
function searchPhrases(query) {
    if (!query || query.trim() === '') {
        return getAllPhrases();
    }

    query = query.toLowerCase();
    const results = [];

    for (const categoryKey in BUILT_IN_PHRASES) {
        const category = BUILT_IN_PHRASES[categoryKey];
        category.phrases.forEach(phrase => {
            if (phrase.zh.includes(query) ||
                phrase.fr.toLowerCase().includes(query) ||
                phrase.en.toLowerCase().includes(query)) {
                results.push({
                    ...phrase,
                    category: categoryKey,
                    categoryTitle: category.title
                });
            }
        });
    }

    return results;
}

// Function to get phrases by category
function getPhrasesByCategory(categoryKey) {
    return BUILT_IN_PHRASES[categoryKey] || null;
}
