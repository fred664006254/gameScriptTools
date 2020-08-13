/**
 * 三国争霸 神将助威
 * author qianjun
 */
class AcThreeKingdomsHeroCheerView extends PopupView{ 

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
            "progress3","progress3_bg",
		]);
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
    }
    
    private get acTivityId() : string{
        return `${this.aid}-${this.code}`;
    }
    

    protected getRequestData():{requestType:string,requestData:any}{	
		return {
            requestType:NetRequestConst.REQUEST_THREEKINGDOMS_GOVERMENTINFO,
            requestData:{
                activeId : this.acTivityId
            }
        };
	}

	protected receiveData(data:{ret:boolean,data:any}):void{
        if(data.ret){
            let rdata = data.data.data;
            this.vo.setMeetingInfo(rdata);
        }
    }


	public initView():void{		
		// let tabName = ["acPunishRankRewardTab1"];
        let view = this;
        let selctcity = view.param.data.selectcity;
        let selectkingdom = view.param.data.selectkingdom;
        //App.MessageHelper.addNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
        let code = view.getUiCode();
        let cfg = view.cfg;

        let tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsherocheertip1`, code)), 20, TextFieldConst.COLOR_BROWN)
        view.addChildToContainer(tipTxt1);
        tipTxt1.lineSpacing = 6;
        tipTxt1.textAlign = egret.HorizontalAlign.CENTER;
        tipTxt1.setPosition((view.viewBg.x + (view.viewBg.width - tipTxt1.width)/2), 20);

        let line = BaseBitmap.create(`public_cut_line`);
        line.width = 455;
        view.addChildToContainer(line);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, tipTxt1, [0,tipTxt1.height+10]);

        let bg = BaseBitmap.create(`public_9_bg94`);
        bg.width = 510;
        bg.height = 160;
        view.addChildToContainer(bg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, line, [0,line.height+15]);

        let icon = BaseBitmap.create(`threekingdomsherocheericon`);
        view.addChildToContainer(icon);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, icon, bg, [13,10]);

        let levelbg = BaseBitmap.create(`public_titlebg`);
        view.addChildToContainer(levelbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelbg, icon, [icon.width,0]);
        
        let curexp = view.vo.getHeroCheerExp();
        let nextexp = 0; 
        let level = 0;
        let curadd = 0;
        let nextadd = 0;
        for(let i in view.cfg.heroList){
            let cfg : Config.AcCfg.ThreeKingdomsHeroListCfg = view.cfg.heroList[i];
            if(curexp >= cfg.needExp){
                level = cfg.id;
                curadd = cfg.addAtk;
            }
        }
        //最大等级
        let curStr = '';
        let nextStr = '';
        curStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsherocheertip4`, code), [(curadd*100).toFixed(0)]);
        if(level == view.cfg.heroList.length){
            nextStr = LanguageManager.getlocal(`acBattlePassMaxLevel-1`);
            nextexp = curexp;
        }
        else{
            let nextcfg = view.cfg.heroList[level];
            nextadd = nextcfg.addAtk;
            nextexp = nextcfg.needExp;
            nextStr = LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsherocheertip4`, code), [(nextadd*100).toFixed(0)]);
        }

        let levelTxt = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifanglevel`, [level.toString()]), 22, TextFieldConst.COLOR_LIGHT_YELLOW);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelTxt, levelbg, [10,0]);
        view.addChildToContainer(levelTxt);

        let tipTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsherocheertip5`, code)), 18, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt, levelbg, [10,levelbg.height+7]);
        view.addChildToContainer(tipTxt);

        let curTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsherocheertip2`, code), [curStr]), 18, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, curTxt, tipTxt, [0,tipTxt.height+5]);
        view.addChildToContainer(curTxt);

        let nextTxt = ComponentManager.getTextField(LanguageManager.getlocal(App.CommonUtil.getCnByCode(`acThreeKingdomsherocheertip3`, code), [nextStr]), 18, TextFieldConst.COLOR_BROWN);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nextTxt, curTxt, [0,curTxt.height+5]);
        view.addChildToContainer(nextTxt);

        let progressBar = ComponentManager.getProgressBar("progress3", "progress3_bg", 490);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, progressBar, bg, [0,10]);
        view.addChildToContainer(progressBar);

		let percent = curexp/nextexp;
		let textStr = level == view.cfg.heroList.length ? nextStr : (`${curexp}/${nextexp}`);
		let textColor = TextFieldConst.COLOR_WHITE;
		progressBar.setPercentage(percent, textStr, textColor);
        
        // let btn = ComponentManager.getButton(ButtonConst.BTN2_SMALL_YELLOW, `confirmBtn`, ()=>{
        //     //确认
        //     view.hide();
        // }, view);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, bg, [0,bg.height+10]);
        // view.addChildToContainer(btn);

    }

	protected getTitleStr():string{
		return App.CommonUtil.getCnByCode(`acThreeKingdomsherocheer`, this.getUiCode());
    }

    protected getShowHeight() : number{
        return 420;
    }

	public dispose():void{
        let view = this;
        //App.MessageHelper.removeNetMessage(NetRequestConst.REQUEST_THREEKINGDOMS_UPGRADEREWARD, view.attackBack, view);
		super.dispose();
	}
}