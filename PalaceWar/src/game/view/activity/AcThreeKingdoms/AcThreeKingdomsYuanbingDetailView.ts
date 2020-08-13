/**
 * 三国争霸城市援兵详情说明弹窗
 * author qianjun
 */
class AcThreeKingdomsYuanbingDetailView extends PopupView{
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
    
    private get cityId():number{
        return this.param.data.cityId;
    }

    private get kingdomid():number{
        return this.param.data.kingdomid;
    }


	protected getResourceList():string[]{
		return super.getResourceList().concat([
           `titleupgradearrow`
		]);
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
	}

	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
        let view = this;
        let code = view.getUiCode();
        let vo = view.vo;
        let cfg = view.cfg;
        //顶部描述
        let descbg = BaseBitmap.create(App.CommonUtil.getResByCode(`threekingdomsdescbg`, code));
        let descTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip32`, code)), 18, TextFieldConst.COLOR_LIGHT_YELLOW);
        descTxt.lineSpacing = 5;
        descTxt.width = 450;
        descbg.width = descTxt.width + 80;
        descbg.height = descTxt.height + 30;
        view.addChildToContainer(descbg);
        view.addChildToContainer(descTxt);

        descbg.x = view.viewBg.x + (view.viewBg.width - descbg.width) / 2;
        descbg.y = 20;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, descTxt, descbg);

        
        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip33`, code)), 20, TextFieldConst.COLOR_WARN_GREEN2);
        view.addChildToContainer(tipTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, descbg, [0,descbg.height+20]);
        tipTxt.addTouchTap(()=>{
               //打开加成详情弹窗
               ViewController.getInstance().openView(ViewConst.POPUP.ACTHREEKINGDOMSYUANBBUFFPOPUPVIEW,{
                aid : view.aid,
                code : view.code,
            });
        }, view, null);

        let listbg = BaseBitmap.create(`public_9_bg4`);
        listbg.width = 530;
        listbg.height = 430;
        view.addChildToContainer(listbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, listbg, tipTxt, [0,tipTxt.height+25]);
        let isCentercity = view.kingdomid == 0;

        let armynumArray = [];
        for (let i=1; i<=3; i++)
        {
            armynumArray.push(view.vo.getCityKingdomArmy(view.kingdomid, view.cityId, i));
        }
        armynumArray.sort((a,b)=>{
              return b - a;
        });
        let arr = [{
            id : 1,
            point : view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 1, isCentercity)
        },{
            id : 2,
            point : view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 2, isCentercity)
        },{
            id : 3,
            point : view.vo.getCityYuanBingPercent(view.kingdomid, view.cityId, 3, isCentercity)
        }];
        
        arr.sort((a,b)=>{
            if(a.point == b.point){
                return a.id - b.id;
            }
            else{
                return b.point - a.point;
            }
        });

        let uidata = view.kingdomid == 0 ? view.cfg.troop2 : view.cfg.troop1;
        let rankdata = view.kingdomid == 0 ? view.cfg.troopRank2 : view.cfg.troopRank1;

        for(let k = 1; k <= arr.length; ++ k){
            let kingdomid = arr[k - 1].id;
            let armygroup = new BaseDisplayObjectContainer();
            view.addChildToContainer(armygroup);
            armygroup.width = 515;
            armygroup.x = listbg.x + 7.5;
            armygroup.y = listbg.y + 10 + (k - 1) * 140;

            let bg = BaseBitmap.create(`public_9_bg94`);
            bg.width = 515;
            bg.height = 130;
            armygroup.addChild(bg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, armygroup, [0,0], true);

            let armyicon = BaseBitmap.create(`threekingdomarmyicon${kingdomid}`);
            armygroup.addChild(armyicon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, armyicon, bg, [25,0]);

            let threekingdomsfont = BaseBitmap.create(`threekingdomsfont${kingdomid}`);
            armygroup.addChild(threekingdomsfont);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, threekingdomsfont, armyicon, [0,5]);
		
            let curlv = 0;
            let add1 = 0;
            let add2 = 0;
            //援军数
            let armynum = view.vo.getCityKingdomArmy(view.kingdomid, view.cityId, kingdomid);
            for(let index = 0; index < uidata.length; index++) {
                let element : Config.AcCfg.ThreeKingdomsTroop1Cfg = uidata[index];
                if(armynum < (element.needNum * 100000000)){
                    break;
                }
                add1 = element.addAtk;
                 ++curlv;
            }
            let yuanbingpercentTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip37`, code), [App.StringUtil.changeIntToText(armynum),add1.toString()]), 20, TextFieldConst.COLOR_BROWN);
            armygroup.addChild(yuanbingpercentTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, yuanbingpercentTxt, bg, [0,40]);

            for(let index = 0; index < rankdata.length; index++) {
                let element : Config.AcCfg.ThreeKingdomsTroop1RankCfg = rankdata[index];
                if(armynum < (element.needNum * 100000000)){
                    break;
                }
                add2 = element[`rank${k}`]
            }

            let rankStr = String(armynumArray.indexOf(armynum)+1);
            let armynumTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsTip38`, code), [rankStr, add2.toString()]), 18, TextFieldConst.COLOR_BROWN);
            armygroup.addChild(armynumTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, armynumTxt, yuanbingpercentTxt, [0,yuanbingpercentTxt.textHeight+12]);

            let arrow = BaseBitmap.create(`titleupgradearrow`);
            armygroup.addChild(arrow);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, arrow, bg, [100,0]);

            let totaladd = ComponentManager.getBitmapText(`+${add1+add2}`,TextFieldConst.FONTNAME_ITEMTIP);
            armygroup.addChild(totaladd);
            App.DisplayUtil.setLayoutPosition(LayoutConst.rightverticalCenter, totaladd, bg, [20,0]);
        }
    }

    // protected getShowHeight() : number{
    //     return 760;
    // }
	protected getTitleStr():string{
		return App.CommonUtil.getCnByCode(`acThreeKingdomsTip39`, this.getUiCode());
    }

	public dispose():void{
        let view = this;
		super.dispose();
	}
}