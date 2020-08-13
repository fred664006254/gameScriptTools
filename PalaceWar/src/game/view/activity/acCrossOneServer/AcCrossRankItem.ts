class AcCrossRankItem extends ScrollListItem {
    public constructor() {
        super();
    }

    private get Vo(): AcCrossOneServerVo {
        return <AcCrossOneServerVo>Api.acVoApi.getActivityVoByAidAndCode(this.data.aid, this.data.code);
    }

    private data: AcCrossRankItemInfo;

    private get localColor(): number {
        return this.data.uid == Api.playerVoApi.getPlayerID() ? 0xfbd13d : 0x3e1f0f;
    }


    protected initItem(index: number, data: AcCrossRankItemInfo, param?: any) {
        this.data = data;

        this.width = 498;
        this.height = 78;

        let _bgName = `rankbgs_${this.data.rank <= 3? this.data.rank : 4}`;
        let _bg = BaseLoadBitmap.create(_bgName);
        _bg.width = this.width;
        _bg.height = this.height;
        this.addChild(_bg);

        if (this.data.rank <= 3) {
            let _rankIcon = BaseLoadBitmap.create(`rankinglist_rankn${this.data.rank}`);
            this.addChild(_rankIcon);
            _rankIcon.anchorOffsetX = 74/2;
            _rankIcon.anchorOffsetY = 42/2;
            _rankIcon.setPosition(52, this.height/2);
        } else {
            let _rankIcon = ComponentManager.getTextField(`${this.data.rank}`, 20, this.localColor);
            _rankIcon.width = 104;
            _rankIcon.textAlign = TextFieldConst.ALIGH_CENTER;
            this.addChild(_rankIcon);
            _rankIcon.setPosition(0, 29);
        }

        let _nickLabel = ComponentManager.getTextField(`${this.data.nick}`, 20, this.localColor);
        _nickLabel.width = 154;
        _nickLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(_nickLabel);
        _nickLabel.setPosition(104, 29);

        let _zidLabel = ComponentManager.getTextField(LanguageManager.getlocal("acCrossOneServerText20", [`${this.data.zid}`]), 20, this.localColor);
        _zidLabel.width = 80;
        _zidLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(_zidLabel);
        _zidLabel.setPosition(104 + 154, 29);

        let _scoreLabel = ComponentManager.getTextField(`${this.data.score}`, 20, this.localColor);
        _scoreLabel.width = 160;
        _scoreLabel.textAlign = TextFieldConst.ALIGH_CENTER;
        this.addChild(_scoreLabel);
        _scoreLabel.setPosition(104 + 154 + 80, 29);
    }

    public dispose() {
        this.data = null;
        super.dispose();
    }

}

interface AcCrossRankItemInfo {
    aid: string,
    code: string,
    uid: number,
    nick: string,
    score: number,
    rank: number,
    zid: number
}