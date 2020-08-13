/**
 * author : qianjun
 * desc : 魏征活动充值itemrender
 */
class AcWeiZhengTaskItem  extends ScrollListItem{
    //item数据
    private _itemData = undefined;
    //领取按钮
    private _collectBtn:BaseButton;
    
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.WeiZhengCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcWeiZhengVo{
        return <AcWeiZhengVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_WEIZHENG;
    }

    private get code() : string{
        return this._code;
    }

    private getUiCode():string{
        let code = ``;
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            default:
                code = this.code;
                break;
        }
		return code;
	}
    
    private _code : string = '';
	protected initItem(index:number,data:any,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
		view.width = 510;
		view.height = 248 + 10;
        view._itemData = data;
        let code = view.getUiCode();
        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = view.width;
        bg.height = view.height - 10;
        view.addChild(bg);

        let taskNum = view.vo.getTaskValue(data.questType, data.day);  
        let isTaskFinish = view.vo.getTaskLq(data.questType, data.day);  
        let canLq = view.vo.canTaskLq(data.questType, data.day);  

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
        
        let nowday = view.vo.getNowDay();
		if(isTaskFinish){
            let flag = BaseBitmap.create(`collectflag`);
            flag.setScale(0.7);
			App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, flag, bg, [10,0]);
            view.addChild(flag);
            if(nowday > data.day){
                App.DisplayUtil.changeToGray(flag);
            }
		}
		else{
            //是否过期
            let btnstr = ``;
            let btnpic = ButtonConst.BTN_SMALL_YELLOW;
            if(canLq){
                btnstr = `taskCollect`;
                
            }
            else{
                if(nowday > data.day || !view.vo.isInActy()){
                    btnstr = `acWeiZhengTip4-${code}`;				
                }
                else if(nowday < data.day){
                    btnstr = `acWeiZhengTip5-${code}`;			
                }
                else{
                    btnstr = `allianceBtnGo`;
                    btnpic = ButtonConst.BTN_SMALL_RED;
                }
            }
            let btn = ComponentManager.getButton(btnpic, btnstr, view.collectHandler, view);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, btn, bg, [10,30]);
            view.addChild(btn);
            view._collectBtn = btn;

            let needTxt = ComponentManager.getTextField(`<font color=${taskNum >= data.value ? TextFieldConst.COLOR_WARN_GREEN2 : TextFieldConst.COLOR_WARN_RED3}>${taskNum}</font> / ${data.value}`, 20, TextFieldConst.COLOR_BLACK);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, needTxt, btn, [0, -needTxt.textHeight]);
            view.addChild(needTxt);
                            
            if(!view.vo.isInActy()){
                App.DisplayUtil.changeToGray(btn);
            }
            else{
                if(nowday == data.day){
                    App.DisplayUtil.changeToNormal(btn);
                }
                else{
                    App.DisplayUtil.changeToGray(btn);
                }
            }
            if(canLq){
                App.DisplayUtil.changeToNormal(btn);
            }
        }
    }

    protected collectHandler(event:egret.TouchEvent) {
        let view = this;
        let data = view._itemData;
        let code = view.getUiCode();
        if(view.vo.et < GameData.serverTime){
            App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
            return;
        }
        let taskNum = view.vo.getTaskValue(data.questType, data.day);  
        let nowday = view.vo.getNowDay();
        if(nowday < data.day){
            App.CommonUtil.showTip(LanguageManager.getlocal(`acWeiZhengTip6-${code}`));
            return;
        }
        let canlq = view.vo.canTaskLq(data.questType, data.day);
        if(canlq){	
            view.vo.lastidx = view._itemData;
            view.vo.lastpos = view._collectBtn.localToGlobal(view._collectBtn.width/2 + 50,20);
            NetManager.request(NetRequestConst.REQUEST_WEIZHENG_GETTASK,{
                activeId : view.acTivityId, 
                taskId : data.key, 
                diffday : data.day
            });
        } 
        else{
            if(nowday > data.day){
                //补领
                ViewController.getInstance().openView(ViewConst.POPUP.ACWEISIGNREWARDVIEW, {
                    aid : view.aid,
                    code : view.code,
                    f : ()=>{
                        view.vo.lastidx = view._itemData;
                        view.vo.lastpos = view._collectBtn.localToGlobal(view._collectBtn.width/2 + 50,20);
                        NetManager.request(NetRequestConst.REQUEST_WEIZHENG_GETBUQIANTASK,{
                            activeId : view.acTivityId, 
                            taskId : data.key, 
                            diffday : data.day
                        });
                    },
                    o : view
                });
            }
            else if(nowday == data.day){    	
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