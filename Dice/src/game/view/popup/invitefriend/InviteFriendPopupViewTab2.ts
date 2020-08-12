/**
 * 邀请好友tab2
 * author qianjun
 */
class InviteFriendPopupViewTab2 extends CommonViewTab{
    private _errTxt : BaseTextField = null;
    private _boxId : string = ``;

	public constructor() {
		super();
		this.initView();
    }

    protected getNetConstEventArr():string[]{
		return [
            NetConst.INVITEFRIEND_BIND
		];
	}

	protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
            case NetConst.INVITEFRIEND_BIND:
                view.bindCallBack(evt);
                break;
		}
    }
    private get cfg(){
        return Config.InvitefriendCfg;
    }

    private get api(){
        return Api.InviteFriendVoApi;
    }

	public initView():void{
        let view = this;
        let api = view.api;
        view.initEventListener();
        view.width = 500;
        view.height = 531;

        let wordbg = BaseBitmap.create(`invitefriendwordbg`);
        wordbg.width = 500;
        wordbg.height = 204;
        view.addChild(wordbg);

        let descTxt = ComponentMgr.getTextField(LangMger.getlocal(`invitefriendTip6`), TextFieldConst.SIZE_22, 0xCFDEFF);
        descTxt.stroke = 2;
        descTxt.strokeColor = 0x0C2C77;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, descTxt, wordbg, [0,19]);
        view.addChild(descTxt);

        let rewards = GameData.formatRewardItem(view.cfg.getUseCanGet());
        let len = rewards.length;
        let tmpx = (wordbg.width - len * 124 - (len - 1) * 24) / 2;
        view._boxId = ``;
        for (let index = 0; index < len; index++) {
            let vo = rewards[index];
            const item = this.createTopItem(vo);
            view.addChild(item);
            item.setPosition(wordbg.x + tmpx + index * (124 + 24), descTxt.y + descTxt.textHeight + 23);
            if(vo.type == 50){
                view._boxId = vo.id + '';
            }
        }
        
        let inviteTxt = ComponentMgr.getTextField(LangMger.getlocal(`invitefriendTip7`), TextFieldConst.SIZE_22, 0xFFFFFF);
        inviteTxt.stroke = 2;
        inviteTxt.strokeColor = 0x000000;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, inviteTxt, wordbg, [0,wordbg.height+40]);
        view.addChild(inviteTxt);

        let input = ComponentMgr.getInputTextField(ColorEnums.gray, TextFieldConst.SIZE_22, 320, 48, "joinwarinputbg", ``, ColorEnums.gray);
        view.addChild(input);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, input, inviteTxt, [0,inviteTxt.height+17]);
        let inputTxt = <BaseTextField>input.getChildByName("textField");
        inputTxt.setColor(ColorEnums.white);

        let errTxt = ComponentMgr.getTextField(LangMger.getlocal(`invitefriendTip8`), TextFieldConst.SIZE_22, 0xDA5151);
        errTxt.stroke = 0;
		App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, errTxt, wordbg, [0,wordbg.height+146]);
        view.addChild(errTxt);
        errTxt.visible = false;
        view._errTxt = errTxt;

        let copyBtn = ComponentMgr.getButton(`invitefriendcopybtn`, LangMger.getlocal(`sysuse`), ()=>{
            //使用
            NetManager.request(NetConst.INVITEFRIEND_BIND, {
                bindCode : inputTxt.text
            });
        }, view);
        view.addChild(copyBtn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, copyBtn, wordbg, [0,wordbg.height+218]);
        copyBtn.visible = !api.getIsFinishBind();
    }

    private createTopItem(itemVo:RewardItemVo):BaseDisplayObjectContainer{
        let view = this;
        let item = new BaseDisplayObjectContainer();
        item.width = 124;
        item.height = 127;
        
        let bg = BaseBitmap.create(`invitefriendrewardbg`);
        item.addChild(bg);

        let lingpai= ComponentMgr.getCustomMovieClip( itemVo.type == 100? "firstrec_effect1_":"firstrec_effect2_", null, 120);
        lingpai.blendMode = egret.BlendMode.ADD;
        lingpai.playWithTime(0);
        item.addChild(lingpai);
        lingpai.anchorOffsetX = 190 / 2;
        lingpai.anchorOffsetY = 180 / 2;
        lingpai.setScale(1.3);
        lingpai.x = 60;
        lingpai.y = 58;
        lingpai.name = `lingpai`;

        let iconstr = itemVo.icon;
        let icon = BaseLoadBitmap.create(iconstr, null, {callback : ()=>{
            icon.setScale(itemVo.type == 50 ? 0.35 : 0.65);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, icon, bg, [0,itemVo.type == 50 ? 0 : 17]);
        }, callbackThisObj : view});
        item.addChild(icon);

        let numTxt = ComponentMgr.getTextField(`x${itemVo.num}`, TextFieldConst.SIZE_28);
        item.addChild(numTxt);
        numTxt.stroke = 2;
        numTxt.strokeColor = 0x353535;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, numTxt, bg, [0,7]);

        item.addTouchTap(()=>{
            view.showDetails(itemVo)
        }, view);

        return item;
    }

    private bindCallBack(evt : egret.Event):void{
        let view = this;
        view._errTxt.visible = false;
        if(evt.data.ret){
            let rewards = evt.data.data.data.rewards;
            if(rewards){
                if(view._boxId != ''){
                    ViewController.getInstance().openView(ViewConst.GETREWARDPOPUPVIEW,{
                        rewards : rewards,
                        title : LangMger.getlocal(`sysGetReward`),
                        isBoxBuy : false,//连续购买模式
                        specialBoxId : view._boxId,
                        handler : view,
                        needCancel : true,
                        closecallback : ()=>{
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        },
                    });
                    Api.ShopVoApi.setIsBox(false,``);
                } 
                else{
                    ViewController.getInstance().openView(ViewConst.COMMONREWARDPOPUPVIEW,{
                        rewards : rewards,
                        title : LangMger.getlocal(`sysGetReward`),
                        callback: ()=>{
                            App.MsgHelper.dispEvt(MsgConst.USERRES_CHANGE);
                        }
                    });
                }
            }
            else{
                let code = evt.data.data.data.code;
                if(code == 1){
                    view._errTxt.visible = true;
                }
                App.CommonUtil.showTip(LangMger.getlocal(`inviteFriendCodeErr${code}`));
            }
        }
    }

    private showDetails(reward : RewardItemVo) {
        if (reward.type == 50) {
            ViewController.getInstance().openView(ViewConst.BOXREWARDDETAILPOPUPVIEW,{
                title : reward.name,
                needCancel : false,
                needClose : 1,
                boxId : reward.id,
            });
        } else if (reward.type == 1 || reward.type == 2) {
            ViewController.getInstance().openView(ViewConst.SIGNSHOWPOPVIEW, {
                title : reward.name,
                handler : null,
                needCancel : false,
                needClose : 1,
                param : reward,
                costnum :LangMger.getlocal("sysconfirm"),
                // costIcon : `ab_mainui_gem`
            });
        }
    }

    public dispose(){
        let view = this;
        view._errTxt = null;
        super.dispose();
    }
}