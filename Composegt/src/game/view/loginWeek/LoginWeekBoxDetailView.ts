/**
 * 新官上任阶段奖励预览
 * @author 赵占涛
 */
class LoginWeekBoxDetailView extends PopupView {
    private _nodeContainer: BaseDisplayObjectContainer;
    public constructor() {
        super();
    }

    public initView(): void {
        this._nodeContainer = new BaseDisplayObjectContainer();
        this.addChildToContainer(this._nodeContainer);

        let bg: BaseBitmap = BaseBitmap.create("public_tc_bg01");
        bg.width = 538;
        bg.height = 835;
        bg.x = this.viewBg.x + this.viewBg.width / 2 - bg.width / 2;
        bg.y = 10;
        this._nodeContainer.addChild(bg);

        let tmpy = 25;
        for (var i = 0; i < 4; i++) {
            let cfg = GameConfig.config.loginweekCfg.totalScoreReward[i + 1];

            let rewardsArr: Array<RewardItemVo> = GameData.formatRewardItem(cfg.reward);
            let reward = rewardsArr[0];
            // 背景
            let cellbg: BaseBitmap = BaseBitmap.create(reward.type == 8 ? "loginweek_boxdetailbg" : "loginweek_boxdetail2bg");
            cellbg.x = this.viewBg.x + this.viewBg.width / 2 - cellbg.width / 2;
            cellbg.y = tmpy;
            tmpy += (cellbg.height + 5);
            this._nodeContainer.addChild(cellbg);

            // 标题
            let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal("loginweek_setp", [LanguageManager.getlocal("acChristmasViewFloor" + (i + 1))]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            titleTxt.x = cellbg.x + cellbg.width / 2 - titleTxt.width / 2;
            titleTxt.y = cellbg.y + 16 - titleTxt.height / 2;
            this._nodeContainer.addChild(titleTxt);

            if (reward.type == 8) {

                // 门客形象
                let servantIcon = BaseLoadBitmap.create("servant_full_" + reward.id);
                servantIcon.scaleX = 0.4;
                servantIcon.scaleY = 0.4;
                servantIcon.x = cellbg.x - 15;
                servantIcon.y = cellbg.y + 28;
                this._nodeContainer.addChild(servantIcon);

                // 名称
                let servantName = ComponentManager.getTextField(reward.name, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
                servantName.x = cellbg.x + 20;
                servantName.y = cellbg.y + 48 - servantName.height / 2;
                this._nodeContainer.addChild(servantName);

                // 综合资质
                let servantCfg = Config.ServantCfg.getServantItemById(reward.id);
                let starNum = Config.ServantCfg.getServantItemById(reward.id).getStarNums();
                let str = LanguageManager.getlocal("servantInfo_title", [String(starNum)]);
                let totalTxt = ComponentManager.getTextField(str, TextFieldConst.FONTSIZE_BUTTON_COMMON, TextFieldConst.COLOR_WHITE);
                totalTxt.x = cellbg.x + 103 - totalTxt.width / 2;
                totalTxt.y = cellbg.y + 196 - totalTxt.height / 2;
                this._nodeContainer.addChild(totalTxt);

                // 特殊光环文字
                let light_txt = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeoplea_light"), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
                light_txt.x = cellbg.x + 355 - light_txt.width / 2;
                light_txt.y = cellbg.y + 62 - light_txt.height / 2;;
                this._nodeContainer.addChild(light_txt);

                // 光环1
                let aura1Name = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeoplea_force2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
                aura1Name.x = cellbg.x + 219;
                aura1Name.y = cellbg.y + 97 - aura1Name.height / 2;
                this._nodeContainer.addChild(aura1Name);

                // 光环2
                let aura2Name = ComponentManager.getTextField(LanguageManager.getlocal("acFourPeoplea_attribute2"), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
                aura2Name.x = cellbg.x + 219;
                aura2Name.y = cellbg.y + 125 - aura2Name.height / 2;
                this._nodeContainer.addChild(aura2Name);
            } else if (reward.type == 6) {
                // 图标
                let iconList: BaseDisplayObjectContainer[] = GameData.getRewardItemIcons(cfg.reward, true);
                let icon = iconList[0];
                icon.x = cellbg.x + 103 - icon.width / 2;
                icon.y = cellbg.y + 96 - icon.height / 2;
                this._nodeContainer.addChild(icon);

                // 名称
                let itemName = ComponentManager.getTextField(reward.name + "x" + reward.num, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
                itemName.x = cellbg.x + 219;
                itemName.y = cellbg.y + 55 - itemName.height / 2;
                this._nodeContainer.addChild(itemName);
                // 描述
                let itemDesc = ComponentManager.getTextField(reward.desc, TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
                itemDesc.width = 280
                itemDesc.x = cellbg.x + 219;
                itemDesc.y = cellbg.y + 73;
                this._nodeContainer.addChild(itemDesc);
            }
            // 领取条件
            let howToGet = ComponentManager.getTextField(LanguageManager.getlocal("loginweek_howtoget", [String(cfg.needScore)]), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_LIGHT_YELLOW);
            howToGet.x = cellbg.x + 219;
            howToGet.y = cellbg.y + cellbg.height - 27 - howToGet.height / 2;
            this._nodeContainer.addChild(howToGet);

            if (Api.otherInfoVoApi.getLoginWeekSinfo()[i + 1] == 1) {
                //	已领取 
                let collectflag = BaseBitmap.create("collectflag");
                collectflag.x = cellbg.x + 458 - collectflag.width / 2;
                collectflag.y = cellbg.y + cellbg.height - 42 - collectflag.height / 2;
                this._nodeContainer.addChild(collectflag);
            }
        }

    }

	protected getShowHeight()
	{
        return 935;
	}
    protected getResourceList(): string[] {
        return super.getResourceList().concat([
        ]);
    }

    public dispose(): void {
        this._nodeContainer = null
        super.dispose();
    }
}