/**
 * 门客选择
 * author qianjun
 * date 2017/9/28
 */
class ZhenqifangBuildLevelItem extends ScrollListItem
{
	// 属性文本
	public constructor() 
	{
		super();
	}

	protected initItem(index:number,data:any)
    {
        let view = this;
        view.width = 500;
        view.height = 125 + 5;


        let cfg = Config.ZhenqifangCfg.getTaskHouseCfgByLevel(index + 1);
        // --needExp:需要经验值升级至下一级
        // --taskSlotIndiv:任务槽最大数量-个人
        // --taskSlotFid:好友任务，每日刷新数量
        // --ratio:个人任务刷新任务概率，品质由低到高（DCBAS）。
        let bg:BaseBitmap = BaseBitmap.create("public_9_bg44");
		bg.width = view.width;
		bg.height = view.height - 5;
        view.addChild(bg);
        
        let bg1 = BaseBitmap.create(`rankactivenamebg`);
        bg1.rotation = -90;
        bg1.setScale(0.65);
        bg1.x = 0;
        bg1.y = 40;
        view.addChild(bg1);

        let levelTxt = ComponentManager.getTextField(LanguageManager.getlocal(`servant_lv`, [(index+1).toString()]), 20);
        levelTxt.x = bg.x + (100 - levelTxt.width) / 2;
        levelTxt.y = bg.y + 10;
        view.addChild(levelTxt);
        //英 泰 俄 葡
        if (PlatformManager.checkIsRuLang() || PlatformManager.checkIsEnLang() || PlatformManager.checkIsThSp() || PlatformManager.checkIsPtLang()){
            bg1.visible = false;
            levelTxt.setColor(TextFieldConst.COLOR_WARN_YELLOW);
            levelTxt.x = 30;
            levelTxt.y = 10;
        }

        let param = [];
        let levelarr = ['D','C','B','A','S'];
        let colorarr = [
            TextFieldConst.COLOR_QUALITY_WHITE,
            TextFieldConst.COLOR_QUALITY_GREEN,
            TextFieldConst.COLOR_QUALITY_BLUE,
            TextFieldConst.COLOR_QUALITY_PURPLE,
            TextFieldConst.COLOR_QUALITY_ORANGE
        ];
        let str = ``;
        for(let i in cfg.ratio){
            if(cfg.ratio[i]){
                str += LanguageManager.getlocal(`servant_lv`, [`<font color=${colorarr[i]}>${levelarr[i]}</font>`]) + `${(Number(i) == cfg.ratio.length - 1 || (cfg.ratio[Number(i) + 1] == 0)) ? `` : `，`}`;
            }
        }
        let tipTxt1 = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangbuildtip1`, [str]), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt1, bg, [15,40]);
        view.addChild(tipTxt1);

        let tipTxt2 = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangbuildtip2`, [cfg.taskSlotIndiv]), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt2, tipTxt1, [0,tipTxt1.textHeight+5]);
        view.addChild(tipTxt2);

        let tipTxt3 = ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangbuildtip5`, [cfg.taskSlotFid]), 20);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt3, tipTxt2, [0,tipTxt2.textHeight+5]);
        view.addChild(tipTxt3);

        // let tipTxt4= ComponentManager.getTextField(LanguageManager.getlocal(`zhenqifangbuildtip5`, [cfg.taskSlotFid]), 20);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, tipTxt4, tipTxt3, [0,tipTxt3.textHeight+5]);
        // view.addChild(tipTxt4);

        
        let curlevel = Api.zhenqifangVoApi.ZhenqifangLevel;
        if(index + 1 <= curlevel){
            let flag = BaseBitmap.create(index + 1 == curlevel ? `zqffinished2` : `zqffinished`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, flag, bg, [-2,-3]);
            view.addChild(flag);
            if(index + 1 == curlevel){
                let selectbg = BaseBitmap.create(`zqfselected`);
                selectbg.width = bg.width + 20;
                selectbg.height = bg.height + 20;
                view.addChild(selectbg);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, selectbg, bg);
            }
        }

        if(curlevel == index + 1){
            view.height = 185;
            let line = BaseBitmap.create(`battlepassline-1`);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, line, bg, [0,bg.height + 10]);
            view.addChild(line);
        }
	}

	private get api(){
        return Api.zhenqifangVoApi;
    }

    public getSpaceX():number{
        return 0;
    }

    public getSpaceY():number{
        return 0;
    }
    
	public dispose():void
    {
        super.dispose();
    }
}