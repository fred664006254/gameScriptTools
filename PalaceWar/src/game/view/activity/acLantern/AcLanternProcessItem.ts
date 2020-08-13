class AcLanternProcessItem extends ScrollListItem {


    private itemData:any =null;

	public constructor() {
		super();
	}

	private get cfg() : Config.AcCfg.LanternCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcLanternVo{
        return <AcLanternVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_LANTERN;
    }

    private get code() : string{
        return this._code;
    }
	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
			case 1:
			case 2:
			case 3:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
	}
    
    private _code : string = '';
	protected initItem(index:number,data:Config.AcCfg.LanternAnswerItemCfg,itemParam:any)
    {	
        let view = this;
        view._code = itemParam.code;
		// getReward
		// value
		//id
		let id = itemParam.id;
        this.itemData = itemParam.code;
		let aid = this.aid;
		let code = this.code;
		let uicode = this.getUiCode();

		let vo = this.vo;
		let cfg = this.cfg;
		this.width = 530;
		let bg = BaseBitmap.create("public_9_bg14");
		bg.width = 530;
		bg.height = 140;
		this.addChild(bg);

		let titleBg = BaseLoadBitmap.create("countrywarrewardview_itembg");
		titleBg.width = 540;
		titleBg.height = 35;
		titleBg.setPosition(bg.x + bg.width / 2 - titleBg.width / 2, bg.y + 10);
		this.addChild(titleBg);

		let titleTF = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`aclanterntip8`, code), [String(data.answerfrequency)]), TextFieldConst.FONTSIZE_CONTENT_COMMON, TextFieldConst.COLOR_LIGHT_YELLOW);
		titleTF.setPosition(titleBg.x + titleBg.width / 2 - titleTF.width / 2, titleBg.y + titleBg.height / 2 - titleTF.height / 2)
		this.addChild(titleTF);

		let itemTopLine: BaseBitmap = BaseBitmap.create("public_line3");
		itemTopLine.width += titleTF.width;
		itemTopLine.setPosition(titleBg.x + titleBg.width / 2 - itemTopLine.width / 2, titleBg.y + titleBg.height / 2 - itemTopLine.height / 2);
		this.addChild(itemTopLine);

		let rewardVoList = GameData.formatRewardItem(data.getReward);
		let scale = 0.85;
		let itemHeight = 0;
		let rewardbg = BaseBitmap.create("public_9_managebg");
		rewardbg.width = 502;
		rewardbg.setPosition(titleBg.x + titleBg.width / 2 - rewardbg.width / 2, titleBg.y + titleBg.height + 3);
		this.addChild(rewardbg);
		for (let i = 0; i < rewardVoList.length; i++) {
			let rewardDB = GameData.getItemIcon(rewardVoList[i], true);
			rewardDB.setScale(scale);
			rewardDB.setPosition(rewardbg.x + 5 + ((rewardDB.width - 8) * (i % 5)), rewardbg.y + 5 + ((rewardDB.height - 8) * Math.floor(i / 5)))
			this.addChild(rewardDB);
			itemHeight = rewardDB.height;
		}
		rewardbg.height = (rewardVoList.length % 5 == 0 ? rewardVoList.length / 5 : Math.floor(rewardVoList.length / 5) + 1) * itemHeight;
		bg.height += (rewardbg.height - 20);

		let progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 350);
		progressBar.setPosition(rewardbg.x + 2, rewardbg.y + rewardbg.height + 20);
		this.addChild(progressBar);
		let percent = vo.getProcessNum() / data.answerfrequency;
		let textStr = vo.getProcessNum() + "/" + data.answerfrequency;
		let textColor = TextFieldConst.COLOR_WHITE;
		progressBar.setPercentage(percent, textStr, textColor);

		// let titelTxt = ComponentManager.getTextField(LanguageManager.getlocal("acWorshipAchievementPopupViewItemProgress-" + code), TextFieldConst.FONTSIZE_CONTENT_SMALL, TextFieldConst.COLOR_BLACK);
		// titelTxt.setPosition(progressBar.x + progressBar.width / 2 - titelTxt.width / 2, progressBar.y - titelTxt.height - 5);
		// this.addChild(titelTxt);

		if (vo.isGetprocessReward(data.id)) {
			let flagScale = 0.6;
			let flag = BaseBitmap.create("collectflag");
			flag.setScale(flagScale);
			flag.setPosition(bg.x + bg.width - flag.width * flagScale - 10, progressBar.y + progressBar.height / 2 - flag.height * flagScale / 2);
			this.addChild(flag);
		}
		else {
			let receiveBtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, 'taskCollect', () => {
				if (vo.isActyEnd()) {
					App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
					return;
				}
				if(vo.getProcessNum() < data.answerfrequency){
					App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`aclanterntip7`, view.getUiCode())));
					return;
				}
				this.vo.lastidx = this._index;
				this.vo.lastpos = receiveBtn.localToGlobal(receiveBtn.width/2 + 50,20);
				NetManager.request(NetRequestConst.REQUEST_LANTERN_PROCESSREWARD, { activeId: vo.aidAndCode, rkey: data.id });
			}, this);
			receiveBtn.setPosition(bg.x + bg.width - receiveBtn.width - 20, progressBar.y + progressBar.height / 2 - receiveBtn.height / 2);
			this.addChild(receiveBtn);
			if (vo.getProcessNum() >= data.answerfrequency) {
				receiveBtn.setGray(false);
			}
			else {
				receiveBtn.setGray(true);
			}
		}
		this.height = bg.height;
		if (id == data.id) {
			let light = BaseBitmap.create("public_9_bg57")
			light.width = bg.width + 10;
			light.height = bg.height + 14;
			light.setPosition(bg.x - 6, bg.y - 6);
			this.addChild(light);
			egret.Tween.get(light, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
		}
	}



	public getSpaceY(): number {
		return 5;
	}

	public dispose(): void {

		super.dispose();
	}
}