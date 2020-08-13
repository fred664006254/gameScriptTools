class AcJurakudaiTaskItem extends ScrollListItem {
    public constructor() {
        super();
    }

    private data: AcJurakudaiTaskItemParams;

    private get code():string{
        return this.data.code;
    }

    private get aid():string{
        return this.data.aid;
    }

    private get acVo() : AcJurakudaiVo{
		return <AcJurakudaiVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    protected initItem(index:number, data:AcJurakudaiTaskItemParams) {
        this.data = data;
        // let rewIcons = GameData.getRewardItemIcons(this.data.taskCfg.getReward, true);

        // if (this.data.taskCfg.specialReward > 0) {
        //     rewIcons.unshift(GameData.getSpecialItemIcon("jurakudaiicon1-1", 7, this.data.taskCfg.specialReward));
        // }
        let rewIcons = GameData.getRewardItemIcons(this.acVo.formatReward(this.data.taskCfg.getReward, this.data.taskCfg.specialReward), true, true);
        
        this.width = 522;
        this.height = 210 + 96 * Math.floor((rewIcons.length-1) / 5);

        let _bg = BaseBitmap.create("public_listbg3");
        this.addChild(_bg);
        _bg.width = this.width;
        _bg.height = this.height;

        let _titleBg = BaseLoadBitmap.create("shopview_redbg");
        _titleBg.width = 295;
        _titleBg.height = 32;
        this.addChild(_titleBg);
        _titleBg.setPosition(_bg.x + 3, _bg.y + 11);

        let _titleText = ComponentManager.getTextField(this.acVo.getTaskDesByCfg(this.data.taskCfg), 22, 0xfff8e8);
        this.addChild(_titleText);
        _titleText.setPosition(_bg.x + 24, _bg.y + 17);

        for (let i=0;i<rewIcons.length;i++) {
            let _icon = rewIcons[i];
            this.addChild(_icon);
            _icon.setScale(89 / _icon.width);
            _icon.setPosition(
                23 + 96 * (i%5),
                48 + 96 * Math.floor(i/5)
            );
        }

        let __value: number = this.acVo.taskplan[this.data.taskCfg.questType] || 0;
        let _bar = ComponentManager.getProgressBar("progress_type1_yellow2", "progress_type3_bg", 354);
        this.addChild(_bar);
        _bar.setPosition(_bg.x + 21, _bg.y + _bg.height - 53);
        _bar.setPercentage(__value/this.data.taskCfg.value);
        _bar.setText(`${__value}/${this.data.taskCfg.value}`);

        if (this.data.status == 1) {
            let hasRec = BaseLoadBitmap.create("collectflag");
            this.addChild(hasRec);
            hasRec.setPosition(_bg.x + 384, _bg.y + _bg.height - 68);
            hasRec.setScale(0.8);
        } else if (this.data.status == 2) {
            if (this.data.taskCfg.questType == 111) {
                // 登陆任务，无需跳转
                let recBtn = ComponentManager.getButton(
                    "btn_small_yellow",
                    "acJurakudaiText3",
                    null,
                    this
                );
                this.addChild(recBtn);
                recBtn.setPosition(_bg.x + 378, _bg.y + _bg.height - 68);
                recBtn.setGray(true);
            } else {
                let gotoBtn = ComponentManager.getButton(
                    "btn_small_blue",
                    "acJurakudaiText10",
                    this.onJumpTap,
                    this
                );
                this.addChild(gotoBtn);
                gotoBtn.setPosition(_bg.x + 378, _bg.y + _bg.height - 68);
            }
        } else {
            let recBtn = ComponentManager.getButton(
                "btn_small_yellow",
                "acJurakudaiText3",
                this.onReciveTap,
                this
            );
            this.addChild(recBtn);
            recBtn.setPosition(_bg.x + 378, _bg.y + _bg.height - 68);
        }
    }

    /**前往 */
    private onJumpTap() {
        let open: string = this.data.taskCfg.openType;
        if (open == "personget") {
            App.MessageHelper.dispatchEvent(MessageConst.MESSAGE_JURAKUDAI_GOTOMAIN);
        }
        Api.mainTaskVoApi.jumpByOpenType(open);
    }

    /**领取 */
    private onReciveTap() {
        NetManager.request(NetRequestConst.REQUEST_ACTIVITY2S_GETJURAKUDAITASKREWARD, {
            activeId: this.acVo.aidAndCode,
            taskType: this.data.taskCfg.taskType
        })
    }

    public getSpaceX():number {
		return 0;
	}

	public getSpaceY():number {
		return 6;
	}

    public dispose() {
        super.dispose();
    }
}

/**大宴乡勇-任务数据结构 */
interface AcJurakudaiTaskItemParams {
    aid: string,
    code: string,
    /**任务配置 */
    taskCfg: Config.AcCfg.JurakudaiTaskItem,
    /**
     * 领取状态
     * 1.已领取  2.不可领取  3.可领取
     *  */
    status: number
}