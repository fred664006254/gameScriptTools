/**
 * author : qianjun
 * desc : 观赛任务itemrender
 */
class AcBattlegroundChargeItem  extends ScrollListItem{
    //item数据
    private _itemData = undefined;
    //领取按钮
    private _collectBtn:BaseButton;
    
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.BattleGroundCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcBattleGroundVo{
        return <AcBattleGroundVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_BATTLEGROUND;
    }

    private get code() : string{
        return this._code;
    }

    protected getUiCode() : string{
        let code = ``;
        switch(Number(this.code)){
            default:
                code = `1`;
                break;
        }
        return code;
    }
    
    private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 620;
		view.height = 248 + 10;
        view._itemData = data;
        let code = view.getUiCode();
        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height - 10;
        view.addChild(bg);

        let taskNum = view.vo.getTaskValue(data.questType);  
        let isTaskFinish = view.vo.isGetTask(data.id);  
        let canLq = taskNum >= data.value;  

        let topbg = BaseBitmap.create("activity_charge_red");
        topbg.y = 5;
        topbg.x = 2;
        view.addChild(topbg);

        let param = '';
		if(data.questType == `1028`){
			let cfg = Config.SearchCfg.getPersonItemCfgByPersonId(data.value2);
			if(cfg && cfg.name){
				param = cfg.name;
			}
		}
        let titleTxt = ComponentManager.getTextField(LanguageManager.getlocal(`taskDesc${data.questType}`, [data.value, param]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
		App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, titleTxt, topbg, [10,0]);
		view.addChild(titleTxt);

        topbg.width = titleTxt.textWidth + 60;
        
		let str = data.getReward;
		str = `1020_0_${data.helpAdd}_${view.getUiCode()}|` + str;

        let rewardArr =  GameData.formatRewardItem(str);
        let scroStartY = 70;
        let len = Math.min(5, rewardArr.length)
        let tmpX = 15;//(view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX +7);
            if (tmpX > bg.width-8)
            {
                tmpX = (view.width - len * 108 * 0.8 - (len - 1) * 7) / 2;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width  * iconItem.scaleX +7);
            }
            
            this.addChild(iconItem);
        }
        scroStartY += (108 * 0.8);
        bg.height = scroStartY + 15;
		this.height = bg.height;
		
		if(isTaskFinish){
            let flag = BaseBitmap.create(`collectflag`);
            flag.setScale(0.7);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, flag, bg, [10,0]);
            view.addChild(flag);
		}
		else{
            //是否过期
            let btnstr = ``;
            if(canLq){
                btnstr = `taskCollect`;
            }
            else{
                if(!view.vo.isInActy()){
                    btnstr = `acWeiZhengTip4-${code}`;				
                }
                else{
                    btnstr = `allianceBtnGo`;
                }
            }
            let btn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, btnstr, view.collectHandler, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [10,30]);
            view.addChild(btn);
            view._collectBtn = btn;

            let needTxt = ComponentManager.getTextField(`<font color=${taskNum >= data.value ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED3}>${taskNum}</font> / ${data.value}`, 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, needTxt, btn, [0, -needTxt.textHeight]);
            view.addChild(needTxt);
                            
            if(!view.vo.isInActy()){
                App.DisplayUtil.changeToGray(btn);
            }
            if(canLq){
                App.DisplayUtil.changeToNormal(btn);
			}
        }
    }

    public refreshReward():void{

    }

    protected collectHandler(event:egret.TouchEvent) {
        let view = this;
        let data = view._itemData;
        let code = view.getUiCode();
        if(view.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let taskNum = view.vo.getTaskValue(data.questType);  
        let canlq = taskNum >= data.value;
        if(canlq){	
			view.vo.selIdx = data.id;
			view.vo.lastpos = view._collectBtn.localToGlobal(view._collectBtn.width/2 + 20,20);
            NetManager.request(NetRequestConst.REQUEST_BATTLEGROUND_TASK,{
                activeId : view.acTivityId, 
                rkey : data.id, 
            });
        } 
        else{
			//跳转任务
			if(!view.vo.isInActy()){
				App.CommonUtil.showTip(LanguageManager.getlocal("acPunishEnd"));
				return;
			}
			if(data.questType==2){
				ViewController.getInstance().openView(ViewConst.COMMON.SHOPVIEW_TAB1);
				return; 
			}
			if(!data.openType){
				return; 
			}
			App.CommonUtil.goTaskView(data.openType);
        }
    }
    
    public getSpaceX():number{
        return 0;
    }
    /**
     * 不同格子Y间距
     */
    public getSpaceY():number{
        return 5;
    }
    public dispose():void{
        this._itemData = null;
        this._collectBtn = null;
        // this._lastReqIdx = null;
        super.dispose();
    }
}