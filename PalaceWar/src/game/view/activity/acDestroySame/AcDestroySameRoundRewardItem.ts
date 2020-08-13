/**
 * author : qianjun
 * desc : 奖励展示
 */
class AcDestroySameRoundRewardItem  extends ScrollListItem
{
    
    public constructor()
    {
        super();
    }

    private get cfg() : Config.AcCfg.DestroySameCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    private get vo() : AcDestroySameVo{
        return <AcDestroySameVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }

    private get aid() : string{
        return AcConst.AID_DESTROYSAME;
    }

    private get code() : string{
        return this._code;
    }

        protected getUiCode():string{
        let code = '';
        switch(Number(this.code)){
            case 1:
            case 2:
                code = `1`;
                break;
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
            case 10:
            case 11:
            case 12:
            case 13:
                code = `4`;
                break;
            default:
                code = this.code;
                break;
        }
        return code;
    }
    
    private _code : string = '';
	protected initItem(index:number,data:number,itemparam:any)
    {	
        let view = this;
        view._code = itemparam;
        let code = view.getUiCode();
		view.width = 510;
		view.height = 250;
        //创建ui
        //背景图片
        let bg = BaseBitmap.create("public_9_bg14");
        bg.width = 510;
        bg.height = 240;
        view.addChild(bg);

        let bottom2:BaseBitmap = BaseBitmap.create("activity_charge_red");  
        view.addChild(bottom2);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, bottom2, bg);

        let tiiptxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroySamekillreward`,this.code, code), [(data).toString()]), 20);
        view.addChild(tiiptxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, tiiptxt, bottom2, [15,0]);

        let rewardgroup = new BaseDisplayObjectContainer();
        rewardgroup.width = 465;
        view.addChild(rewardgroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, rewardgroup, bg, [0,bottom2.y+bottom2.height+15]);

        let cfg : Config.AcCfg.DSBossItemCfg = view.cfg.bossList[data];
        let rewardArr =  GameData.formatRewardItem(cfg.getReward);
        let scroStartY = 2;
        let tmpX = 0;
        for (var index = 0; index < rewardArr.length; index++) {
            let iconItem = GameData.getItemIcon(rewardArr[index],true,true);
            iconItem.setScale(0.8);
            iconItem.x = tmpX;
            iconItem.y = scroStartY;
            tmpX += (iconItem.width * iconItem.scaleX +7);
            if (tmpX > bg.width-8)
            {
                tmpX = 0;
                scroStartY += (iconItem.height * iconItem.scaleX) + 10;
                iconItem.x = tmpX;
                iconItem.y = scroStartY;
                tmpX += (iconItem.width  * iconItem.scaleX +7);
            }
            
            rewardgroup.addChild(iconItem);
        }
        scroStartY += 110;
        bg.height = scroStartY + 135;
        this.height = bg.height;

        let getbtn = ComponentManager.getButton(ButtonConst.BTN_SMALL_YELLOW, `taskCollect`, ()=>{
           //
           if(view.vo.getCurround() <= data){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroySameTip2`, this.code, code)));
                return;
            }
            if (!view.vo.bossrwd || typeof view.vo.bossrwd[data] == `undefined`){
                App.CommonUtil.showTip(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`AcDestroySameTip3`,this.code, code)));
                return;
            }
            if(this.vo.et < GameData.serverTime){
                App.CommonUtil.showTip(LanguageManager.getlocal("time_error"));
                return;
            }

            this.vo.lastidx = index;
            this.vo.lastpos = getbtn.localToGlobal(getbtn.width/2 + 50,20);
            NetManager.request(NetRequestConst.REQUEST_DESTROYSAME_REWARD,{
                activeId:this.acTivityId,
                rkey:data
            })
            
        }, view);
        view.addChild(getbtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, getbtn, bg, [0,20]);

        let isgray = false;
        if (view.vo.getCurround() <= data)
        {
            isgray = true;
        }
        if (!view.vo.bossrwd || typeof view.vo.bossrwd[data] == `undefined`)
        {
            isgray = true;
        }

        getbtn.setGray(isgray);

        let flag = BaseBitmap.create(`collectflag`);
        flag.setScale(0.7);
        view.addChild(flag);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, flag, getbtn);

        flag.visible = view.vo.isGetRoundReward(data);
        getbtn.visible = !flag.visible;
    }

    public getSpaceX():number
    {
        return 0;
    }
    /**
     * 不同格子Y间距
     */
    public getSpaceY():number
    {
        return 5;
    }
    public dispose():void
    {
        // this._lastReqIdx = null;
        super.dispose();
    }
}