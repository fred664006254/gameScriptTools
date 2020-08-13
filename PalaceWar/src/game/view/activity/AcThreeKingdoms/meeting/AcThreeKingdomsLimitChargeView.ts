/**
 * 问卷调查
 */
class AcThreeKingdomsLimitChargeView extends CommonView{    
    private _list : ScrollList = null;

    public constructor() {
		super();
    }
    
	private get cfg() : Config.AcCfg.ThreeKingdomsCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
	}
	
    private get vo() : AcThreeKingdomsVo{
        return <AcThreeKingdomsVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
	}

	protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
			case 1:
				code = `1`;
				break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    protected getResourceList():string[]{
        let code = this.getUiCode();
		return super.getResourceList().concat([
           `threekingdomslimitchargeview`,`progress3`,`progress3_bg`,`shopview_itemtitle`
        ]);
    } 

    protected getBgName():string{
        return `public_9_bg92`;
    }

    protected getRuleInfo():string{
		return `acThreeKingdomsLimitChargeRule-${this.getUiCode()}`;
    }

    protected getTitleBgName():string{
		return App.CommonUtil.getResByCode(`threekingdomslimitchargetitle`, this.getUiCode());
    }

    protected getTitleStr() : string{
        return null;
    }

    protected getBigFrame():string{
		return `commonview_bigframe`;
	}
    
	public initView():void{
        let view = this;

        let key:string = ServerCfg.selectServer.zid+"_pId_"+Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + `limitred` + this.vo.getCurWeek();
        let value:string = LocalStorageManager.get(key);
        if(!value){
            LocalStorageManager.set(key,"1");
        }

        let code = view.getUiCode();
        App.MessageHelper.addNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        App.MessageHelper.addEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_THREEKINGDOMS_RECHAGRERWD),view.qaCallBack,view);
        view.width = GameConfig.stageWidth;
        view.height = GameConfig.stageHeigth;
        view.container.height = view.height - view.titleBg.height;
        view.container.y = view.titleBg.height;
        //top背景图
        let topbg = BaseBitmap.create(`threekingdomslimitchargetopbg`);
        view.addChildToContainer(topbg);

        //本周六周日每日9-22点
        let week = view.vo.getCurWeek();
        let start = view.vo.activeSt + (week - 1) * (7 * 86400);
        let st = start + 5 * 86400 ;
        let et = start + 6 * 86400;

        let datestr = App.DateUtil.getOpenLocalTime(st,et,false);
        let tip1Text = ComponentManager.getTextField(LanguageManager.getlocal(`acThreeKingdomsLimitChargeTime-${code}`, [datestr]), 18);
      
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tip1Text, topbg, [228,56]);
        view.addChildToContainer(tip1Text);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsLimitChargeTimeTip1`, code)), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        tipTxt.width = 380;
        tipTxt.lineSpacing = 5;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, tip1Text, [0,tip1Text.textHeight + 5]);
        view.addChildToContainer(tipTxt);

        let vo = this.vo;
        let objList = [];
        let idx = -1;
        for(let i in view.cfg.recharge){
            objList.push(view.cfg.recharge[i]);
        }
		let arr = view.updateArr(objList);
 		let tmpRect =  new egret.Rectangle(0,0,605, view.container.height - topbg.height - 35);
		let scrollList = ComponentManager.getScrollList(AcThreeKingdomsLimitChargeItem,arr,tmpRect,view.code);
        view._list = scrollList;     
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, scrollList, topbg, [0,topbg.height+10]);
        view.addChildToContainer(scrollList); 
        scrollList.bounces = false;
    }   

    private update():void{
		let view = this;
		if(!view.vo){
			return;
		}
        let objList = [];
        for(let i in view.cfg.recharge){
            objList.push(view.cfg.recharge[i]);
        }
		let arr = view.updateArr(objList);
		view._list.refreshData(arr, view.code);
	}

	private updateArr(arr):any[]{
		let view = this;
		let vo = view.vo; 
		if(!vo)
		{
			return;
		}
		let arr1=[];
		let arr2=[];
		let arr3=[];
		
		let rechareTotal = vo.getChargeNum();
		for(var i:number= 0;i < arr.length; i++)
		{
			if(vo.isGetRecharge(arr[i].id)){//
				arr1.push(arr[i]);
			}
			else{
				if(rechareTotal >= arr[i].needGem)
				{
					arr2.push(arr[i]);
				}
				else
				{
					arr3.push(arr[i]);
				} 
			}
		}
		return arr2.concat(arr3).concat(arr1); 
	}

    public qaCallBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.data.ret == 0){
            let rData = evt.data.data.data;
            let rewards = rData.rewards;
			let cfg = view.cfg.recharge[view.vo.lastidx - 1];
			let str = `1045_1_${cfg.specialReward1}|1046_1_${cfg.specialReward2}`;
			let rewardList =  GameData.formatRewardItem(str);
			let pos = this.vo.lastpos;
            App.CommonUtil.playRewardFlyAction(rewardList,pos);
			this.vo.lastidx = null;
        }
    }
    
	public dispose():void{
        let view = this;
        App.MessageHelper.removeEventListener(NetManager.getMessageName(NetRequestConst.REQUEST_THREEKINGDOMS_RECHAGRERWD),view.qaCallBack,view);
        App.MessageHelper.removeNetMessage(MessageConst.MESSAGE_MODEL_ACTIVITY, view.update, view);
        view._list = null;
        super.dispose();
    }
}