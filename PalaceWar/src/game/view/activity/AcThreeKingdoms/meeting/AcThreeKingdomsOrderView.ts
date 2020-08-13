/**
 * 三国争霸军令弹窗
 * author qianjun
 */
class AcThreeKingdomsOrderView extends PopupView{
	public constructor(){
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
		return super.getResourceList().concat([
            `public_textbrownbg`,
		]);
    }

    protected getBgName():string{
		return `threekingdomsorderbg`;
	}

	protected getCloseBtnName():string{
		return null;
	}

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
        let view = this;
        if(view.vo.getTodayWeek() > 5 && view.vo.getMyKingdoms() && view.vo.getCurPeriod()== 2 && view.vo.isInWarTime() && view.vo.getCurWarPeriod() > 0 &&  view.vo.getCurWarPeriod() < 3){
            let info = view.vo.getOrderInfo();
            if(info.state == 2){
                let key:string = ServerCfg.selectServer.zid+"_pId_"+Api.playerVoApi.getPlayerID() + AcConst.AID_THREEKINGDOMS + `order` + view.vo.getCurWeek() + view.vo.getTodayWeek() + view.vo.getCurWarPeriod();
                let value:string = LocalStorageManager.get(key);
                if(!value){
                    LocalStorageManager.set(key,"1");
                }
            }
        }

        let code = view.getUiCode();
        let vo = view.vo;
        let cfg = view.cfg;
        let title = BaseBitmap.create(`threekingdomsordertitle`);
        view.addChildToContainer(title);
        title.setPosition(view.viewBg.x + (view.viewBg.width - title.width) / 2, 0);
        //顶部描述
        let week = view.vo.getCurWeek();

        let end = view.vo.activeSt + 1 * (7 * 86400);
        let descbg = BaseBitmap.create(`public_textbrownbg`);
        let str = ``;
        let color;
        let minfo = view.vo.getOfficalInfo(1);
        if(week >= 2){
            if(minfo){
                str = minfo.name;
            }
            else{
                str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip2`, code));
            }
        }
        else{
            str = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip1`, code), [App.DateUtil.getFormatBySecond(end, 7)]);
        }
        
        let topTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip3`, code), [str]), 24, TextFieldConst.COLOR_LIGHT_YELLOW);
        topTxt.lineSpacing = 5;
        descbg.width = topTxt.width + 100;
        view.addChildToContainer(descbg);
        view.addChildToContainer(topTxt);
        descbg.x = view.viewBg.x + (view.viewBg.width - descbg.width) / 2;
        descbg.y = 110;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, topTxt, descbg);

        //头像框信息
        let headContainer = null;
        let orderinfo = view.vo.getOrderInfo();
        if(minfo && orderinfo.state == 2){
            headContainer = Api.playerVoApi.getPlayerCircleHead(Number(minfo.pic),(minfo.ptitleid));   
            headContainer.setScale(1);
            headContainer.setPosition(60,160);
            view.addChildToContainer(headContainer);
        }

        
        //未发布
        let tipstr = '';
        let param = [];
        let width = 0;
        let cityid = orderinfo.targetcity;
        if(orderinfo.state == 1){
            tipstr = `acThreeKingdomsmeetingtip4`;
        }
        else{
            tipstr = `acThreeKingdomsmeetingtip5`;
            width = 400;
            param = [
                LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTeam${orderinfo.targetkingdom}`, code)),
                LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdoms${orderinfo.targetkingdom}City${cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2}Name`, code)),
            ];
            let line = BaseBitmap.create(`public_cut_line`);
            view.addChildToContainer(line);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, descbg, [0,descbg.height+110]);

            //第一场攻城战中（xx-xx）
             //本周周一0点
            let start = view.vo.activeSt + (week - 1) * (7 * 86400);
            let round = orderinfo.targetround;
            let unit : Config.AcCfg.ThreeKingdomsActiveCfg = cfg.activeTime[(round == 1 ? 3 : 4) - 1];
            let st = start + (orderinfo.targetweekday - 1) * 86400 + unit.popularityRange[0] * 3600;
            let et = start + (orderinfo.targetweekday - 1) * 86400 + unit.popularityRange[1] * 3600;
            let timeparam = `${App.DateUtil.getFormatBySecond(st,15)}-${App.DateUtil.getFormatBySecond(et,15)}`;

            let desctxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip6`, code), [orderinfo.targetnum,timeparam,LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdoms${orderinfo.targetkingdom}City${cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2}Name`, code)),(view.cfg.order * 100).toFixed(0)]), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            desctxt.lineSpacing = 6;
            desctxt.textAlign = egret.HorizontalAlign.CENTER;
            view.addChildToContainer(desctxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, desctxt, line, [0,line.height+10]);
        }
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(tipstr, code), param), 20);
        view.addChildToContainer(tipTxt);
        tipTxt.lineSpacing = 6;
        tipTxt.textAlign = egret.HorizontalAlign.CENTER;
        if(width){
            tipTxt.width = width;
        }
        if(headContainer){
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, headContainer, [headContainer.width,7]);
        }
        else{
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, descbg, [0,descbg.height+30]);
        }

        //自己是大都督
        if(minfo && minfo.uid == Api.playerVoApi.getPlayerID()){//
            let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `acThreeKingdomsmeetingtip9-${code}`, ()=>{
                if(view.vo.getCurPeriod() == 3){
                    App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsEnter4-1`));
                    return;
                }
                //发布
                App.CommonUtil.removeIconFromBDOC(btn);
                ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSORDERSETTINGVIEW, {
                    aid : view.aid,
                    code : view.code
                });
            }, view);
            view.addChildToContainer(btn);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, descbg, [0,descbg.height+220]);

            if(view.vo.getTodayWeek() > 5){
                let localkey:string = `${Api.playerVoApi.getPlayerID()}-${view.vo.st}-${view.vo.getCurWeek()}-${view.vo.getCurWarPeriod()}`;
                let timeStr:string = LocalStorageManager.get(localkey);
                if (timeStr && timeStr!=""){
                    LocalStorageManager.set(localkey,`true`);
                    App.CommonUtil.addIconToBDOC(btn);
                }
            }
        }
        else{
            let str = '';
            if(view.vo.isInActivity()){
                str = `acThreeKingdomsmeetingtip7`;
            }
            else{
                str = `acThreeKingdomsmeetingtip8`;
            }
            let btipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(str, code)), 20, TextFieldConst.COLOR_LIGHT_YELLOW);
            view.addChildToContainer(btipTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btipTxt, descbg, [0,descbg.height+220]);
        }
    }

    protected resetBgSize():void{
        super.resetBgSize();
        let zhangyin = BaseBitmap.create(`threekingdomsorderzhang`);
        this.addChild(zhangyin);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, zhangyin, this.viewBg, [40,18]);
    }

    protected isTouchMaskClose():boolean{
        return true;
    }


	protected getTitleStr():string{
		return null;
    }


	public dispose():void{
        let view = this;
		super.dispose();
	}
}