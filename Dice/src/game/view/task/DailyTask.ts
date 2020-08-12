

class DailyTask extends BaseDisplayObjectContainer{

    private _bg:BaseBitmap;
    private btns:Array<BaseButton> = [];

    protected getNetConstEventArr():string[]{
		return [
            NetConst.TSAK_GET_DAY_REWARDS
		];
	}

	protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.TSAK_GET_DAY_REWARDS:
                view.openPopupView(evt);
                break;
        }
    }

    public initView(){
        this.initEventListener();
        this._bg = BaseBitmap.create("taskachievement");
        this._bg.width = 495;
        
        this._bg.y = 10;
        this.addChild(this._bg);

        let title = ComponentMgr.getTextField('1', TextFieldConst.SIZE_28, ColorEnums.white);
        this.addChild(title);
        title.text = LangMger.getlocal("dailytasktitle");
        title.x = 17;
        title.y = this._bg.y + 15;
        title.strokeColor = 0x08131A;

        let scale = 0.3;
        let urls = ["item2", "item1", "dicecardlevel1"]
        let btny = this._bg.y + 74;
        let startBtnX = 54;
        for(let index = 0; index < 3; index++){
            let btn = ComponentMgr.getButton("ab_daily_task_icon1", "", this.btnOnclick, this,[index]);

            this.addChild(btn);
            btn.y = btny;
            btn.x = 144 * index + 54;

            let boxIcon = BaseBitmap.create(urls[index]);
            boxIcon.width = boxIcon.height = 50;
            btn.addChild(boxIcon);
            boxIcon.x = (btn.width - boxIcon.width) / 2
            boxIcon.y = (btn.height - boxIcon.height) / 2 - 20;

            let goldTxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_20, ColorEnums.white);
            btn.addChild(goldTxt);
            goldTxt.width = btn.width;
            goldTxt.stroke = 1.5;
            goldTxt.textAlign = egret.HorizontalAlign.CENTER;
            goldTxt.text = `x ${Config.DailytaskCfg.getMustTaskReward(1, index)}`;
            goldTxt.y = boxIcon.y + boxIcon.height - 8;
            

            if(Api.DailytaskVoApi.getDailyGet(index) == 0){
                btn.addChild(this.dailyTxt());
            } else {
                btn.setBtnBitMap("ab_daily_task_icon2");
                // btn.setBtnSize(110,110);
                btn.touchEnabled = false;
                btn.addChild(this.dailyGouhao());
            }

            this.btns[index] = btn;
        }

    }

    private dailyTxt():BaseTextField{
        let txt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.white);
        txt.text = LangMger.getlocal("taskviewcollet");
        txt.width = 116;
        txt.x = 0;
        txt.y = 72 + (38 - txt.height) / 2;
        txt.name = "taskreward";
        txt.textAlign = egret.HorizontalAlign.CENTER;
        txt.strokeColor = ColorEnums.strokeOrange;

        return txt;
    }

    private dailyGouhao():BaseBitmap{
        let gouhao = BaseBitmap.create("ab_task_view_gaohao");
        gouhao.x = 45;
        gouhao.y = 72 + (38 - gouhao.height) / 2 - 7;
        gouhao.name = "gouhao";

        return gouhao;
    }

    private btnOnclick(param){
        NetManager.request(NetConst.TSAK_GET_DAY_REWARDS, {keyPos:param+1});
        let item = this.btns[param];
        if(param < 2){
            Api.UserinfoVoApi.setFreshInfo(true, new egret.Point(item.localToGlobal().x+item.width/2, item.localToGlobal().y+item.height/2));
        }
          
    }

    private openPopupView(event){
        if(event.data.ret){
            if(event.data.data.data.rewards != ``){
                let rewardvo = GameData.formatRewardItem(event.data.data.data.rewards)[0];
                if(rewardvo.type > 2){
                    ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW, {
                        title : LangMger.getlocal("reward_pupopview_title"),
                        rewards : event.data.data.data.rewards
                    });
                }
            }
        }
    }

    public dispose(){
        this.btns = [];

        super.dispose();
    }
}