/**
 * 三国争霸 军令城市选择
 * author qianjun
 */
class AcThreeKingdomsOrderCitySelectView extends PopupView{ 
    private _cityId : number = 1; 
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
    
    private get acTivityId():string{
        return `${this.aid}-${this.code}`;
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
        let id = view.param.data.id;
        let selctcity = view.param.data.selectcity;
        let selectkingdom = view.param.data.selectkingdom;
        App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ORDER, view.selectBack, view);
        let code = view.getUiCode();
        let cfg = view.cfg;

        let tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip16`, code)), 20, TextFieldConst.COLOR_BROWN)
        view.addChildToContainer(tipTxt1);
        tipTxt1.setPosition((view.viewBg.x + (view.viewBg.width - tipTxt1.width)/2), 20);

        let bg = BaseBitmap.create(`public_9_bg4`);
        bg.width = 515;
        bg.height = 210;
        view.addChildToContainer(bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, tipTxt1, [0,tipTxt1.height+10]);

        let arr = [1,2,3];
        arr.splice(view.vo.getMyKingdoms() - 1,1);
        //选择框
        let selectKuang = BaseBitmap.create(`threekingdomsordercurselect`);
        //egret.Tween.get(selectKuang, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);

        view._cityId = 1;
        for(let i = 1; i < 5; ++ i){
            let kingdomid = i < 3 ? arr[0] : arr[1];
            let cityid = (kingdomid - 1) * 2 + (i % 2 == 0 ? 2 : 1);

            let citygroup = new BaseDisplayObjectContainer();
            citygroup.width = 125;
            citygroup.height = 125;
            view.addChildToContainer(citygroup);
            citygroup.addTouchTap(()=>{

                // selectKuang.width = citygroup.width + 10;
                // selectKuang.height = citygroup.height + 14;
                // selectKuang.setPosition(citygroup.x - 6, citygroup.y - 36);
                // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, selectKuang, citygroup);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, selectKuang, citygroup, [0,-30]);
                view._cityId = cityid;
            }, view);

            let city = BaseBitmap.create(`threekingdoms${kingdomid}city${cityid + 3 - (Math.ceil(cityid / 2) - 1) * 2}`);
            // city.setScale(0.5);
            citygroup.addChild(city);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, city, citygroup, [0, 0], true);

            // if(selctcity == cityid){
            //     //当前选择
            //     let curselect = BaseBitmap.create(`threekingdomsordercurselect`);
            //     citygroup.addChild(curselect);
            //     App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, curselect, city, [0,-30]);
            // }

            let namebg = BaseBitmap.create(`threekingdomscitynamebg${kingdomid}`);
            
            let nameSize = 18;
            if (PlatformManager.checkIsEnLang()){
                nameSize = 14;
            }
            let nameTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdoms${kingdomid}City${(i % 2 == 0 ? 2 : 1) + 3}Name`, code)),nameSize,TextFieldConst.COLOR_LIGHT_YELLOW); 
            citygroup.addChild(namebg);
            namebg.name = `namebg${i}`;
            nameTxt.name = `nameTxt${i}`;


            let font = BaseBitmap.create(`threekingdomsfont${kingdomid}`);
            citygroup.addChild(font);
            font.setScale(0.7);

            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, namebg, city, [0,80]);
            citygroup.addChild(nameTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, nameTxt, namebg);
            if (PlatformManager.checkIsEnLang()){
                App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, nameTxt, namebg, [53,0]);
            }
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, font, namebg, [3,0]);


            citygroup.setPosition(bg.x+(10 + (i - 1) * 125), bg.y+40);
            if(i == 1){
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, selectKuang, citygroup, [0,-30]);
            }
        }
       
        view.addChildToContainer(selectKuang);

        let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `confirmBtn`, ()=>{
            //确认
            if(view._cityId){
                NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_ORDER,{
                    activeId:view.acTivityId,
                    mainland : view._cityId,
                    ftype : id % 2 == 1 ? 3 : 4,
                    day : id < 3 ? 6 : 7,
                });
            }
            else{
                view.hide();
            }
            
        }, view);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg, [0,bg.height+20]);
        view.addChildToContainer(btn);

    }

	protected getTitleStr():string{
		return App.CommonUtil.getCnByCode(`acThreeKingdomsmeetingtip15`, this.getUiCode());
    }

    private selectBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            NetManager.request(NetRequestConst.REQUEST_THREEKINGDOMS_GOVERMENTINFO,{
				activeId:view.acTivityId,
			});
            App.CommonUtil.showTip(LanguageManager.getlocal(`acThreeKingdomsmeetingtip18-${view.getUiCode()}`));
            view.hide();
        }
    }

	public dispose():void{
        let view = this;
        view._cityId = 1;
        App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_ORDER, view.selectBack, view);
		super.dispose();
	}
}