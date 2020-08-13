class AcCrossRankRewItem extends ScrollListItem {
    public constructor() {
        super();
    }

    private get Vo(): AcCrossOneServerVo {
        return <AcCrossOneServerVo>Api.acVoApi.getActivityVoByAidAndCode(this.data.aid, this.data.code);
    }

    private data: AcCrossRankRewItemInfo;


    protected initItem(index: number, data: AcCrossRankRewItemInfo, param?: any) {
        this.data = data;

        this.width = 510;
        const l = this.data.rewards.split("|").length;
        this.height = Math.floor((l-1)/5) * 95 + 185;

        let _bg: BaseLoadBitmap = BaseLoadBitmap.create("public_popupscrollitembg");
        this.addChild(_bg);
        _bg.height = this.height - 25;
        _bg.y = 25;

        let _icons = GameData.getRewardItemIcons(this.data.rewards, true, true);
        for (let i=0;i<_icons.length;i++) {
            let _icon = _icons[i]
            this.addChild(_icon);
            _icon.setPosition(i%5 * 92 + 30, Math.floor(i/5) * 95 + 72);
            _icon.setScale(84 / _icon.width);
        }

        this.initTitle();
    }

    private initTitle() {
        let rankBgName = `ackite_ranktitlebg${this.data.rank[0] <= 3? this.data.rank[0] : 4}-1`;
        let rankBg = BaseLoadBitmap.create(rankBgName);
        let rankText: string = "";
        this.addChild(rankBg);
        if (this.data.rank[0] <= 3) {
            rankBg.width = 502;
            rankBg.setPosition((this.width - 502)/2, 0);
            rankText = "" + this.data.rank[0];
        } else {
            rankBg.width = 222;
            rankBg.setPosition((this.width - 222)/2, 20);
            rankText = this.data.rank[0] + "-" + this.data.rank[1];
        }


        let rankLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText7", [rankText]), 22, 0x3e1f0f);
        this.addChild(rankLabel);
        rankLabel.width = this.width;
        rankLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        rankLabel.setPosition(0, 30);
    }

    public dispose() {
        this.data = null;
        super.dispose();
    }
}

interface AcCrossRankRewItemInfo {
    aid: string,
    code: string,
    rewards: string,
    rank: number[]
}