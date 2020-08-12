
class BattleRankInfoItem extends ScrollListItem {

    private _data : any = null;
    private _iswave : boolean = false;
	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : any, param:any) {
        let view = this;
        view._data = data;
        let iswave = param;
        view._iswave = iswave;
        view.width = 498;
        view.height = (iswave ? 239 : 236) + 5;

        let bg = BaseBitmap.create(``);
        view.addChild(bg);
        bg.width = 498;
        bg.height = 210;

        let line = BaseBitmap.create("battle_log_line");
        this.addChild(line);
        line.x = 0;
        let dy = iswave ? 10 : 5;
        line.y = bg.y + bg.height + dy;

        let rankid = index + 1;
        let rankicon = BaseBitmap.create(rankid > 3 ? `public_rankbg` : `public_rank${rankid}`);
        view.addChild(rankicon);
        
        if(iswave){
            let turnTxt = ComponentMgr.getTextField(LangMger.getlocal(`ranktip2`, [data.value]), TextFieldConst.SIZE_30, ColorEnums.white);
            view.addChild(turnTxt);
            turnTxt.stroke = 2;

            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankicon, bg, [(bg.width-rankicon.width-turnTxt.width-5)/2,10]);  
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, turnTxt, rankicon, [rankicon.width+5,0]);  

            if(rankid > 3){
                let rankTxt = ComponentMgr.getTextField(rankid.toString(), TextFieldConst.SIZE_32, ColorEnums.white);
                view.addChild(rankTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rankTxt, rankicon, [0,-6]);
            }
            let namebg = BaseBitmap.create("battle_log_wave_rank_name_bg");
            this.addChild(namebg);
            namebg.width = 490;
            namebg.x = 5;
            namebg.y = 100;
            let leftgroup = view.getInfoGroup(1);
            view.addChild(leftgroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, leftgroup, bg, [20,90]);

            let rightgroup = view.getInfoGroup(2);
            view.addChild(rightgroup);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rightgroup, bg, [265,90]);

            let icon = BaseBitmap.create(`battlelogicon_wave`);
            view.addChild(icon);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterbottom, icon, bg, [0,15]);

        }
        else{
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, rankicon, bg, [15,10]);  
            if(rankid > 3){
                let rankTxt = ComponentMgr.getTextField(rankid.toString(), TextFieldConst.SIZE_32, ColorEnums.white);
                view.addChild(rankTxt);
                App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, rankTxt, rankicon, [0,-6]);
            }

            let infoBg = BaseBitmap.create(`battlelognamebg`);
            this.addChild(infoBg);
            infoBg.width = 388;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, infoBg, rankicon, [rankicon.width,0]);

            // let levelbg = BaseBitmap.create(`public_level_${data.level}`);
            let levelbg = BaseLoadBitmap.create(`levelicon${data.level}`);
            levelbg.setScale(0.175);
            view.addChild(levelbg);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelbg, infoBg, [5, 0]);

            let name = Config.NamesCfg.getEnemyName({uid : data.uid, name : data.name});
            let nameTxt = ComponentMgr.getTextField(name, TextFieldConst.SIZE_22, ColorEnums.white);
            view.addChild(nameTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, infoBg, [89, 12]);
    
            let levelTxt = ComponentMgr.getTextField(LangMger.getlocal(`sysLevel`, [data.level.toString()]), TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.black);
            view.addChild(levelTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, levelTxt, nameTxt, [0, nameTxt.textHeight+5]);

            let scoreImg = BaseBitmap.create(`trophy_icon`);
            scoreImg.setScale(0.42);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scoreImg, rankicon, [rankicon.width+255, 0]);

            // let scoreBg = BaseBitmap.create(`diceattr_icon1`);
            // scoreBg.width = 150;
            // scoreBg.height = 40;
            // view.addChild(scoreBg);
            // App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scoreBg, scoreImg, [scoreImg.width/2, 0]);
            view.addChild(scoreImg);

            let scoreTxt = ComponentMgr.getTextField(data.value.toString(), TextFieldConst.SIZE_24, ColorEnums.white);
            view.addChild(scoreTxt);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, scoreTxt, scoreImg, [scoreImg.width*scoreImg.scaleX + 5, 0]);

            let diceList = ComponentMgr.getScrollList(BattleLogDiceItem, data.line, new egret.Rectangle(0,0,500,140));
            view.addChild(diceList);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftbottom, diceList, bg, [-8,-5]);
        }
    }

    private getInfoGroup(type : number):BaseDisplayObjectContainer{
        let view = this;
        let data = view._data;
        let group = new BaseDisplayObjectContainer();
        group.width = 244;
        group.height = 125;
        let isleft = type == 1;

        let infobg = BaseBitmap.create(``);
        infobg.width = 242;
        infobg.height = 77;
        group.addChild(infobg);

        // let levelbg = BaseBitmap.create(`public_level_${isleft ? data.level : data.flevel}`);
        let levelbg = BaseLoadBitmap.create(`levelicon${isleft ? data.level : data.flevel}`);
        levelbg.setScale(0.175);
        group.addChild(levelbg);
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, levelbg, infobg, [10,5]);

        // let scoreBg = BaseBitmap.create(`diceattr_icon1`);
        // scoreBg.width = 110;
        // scoreBg.height = 30;
        // group.addChild(scoreBg);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, scoreBg, infobg, [25, 10]);

        let name = Config.NamesCfg.getEnemyName({uid : isleft ? data.uid : data.fuid, name : isleft ? data.name : data.fname});
        let nameTxt = ComponentMgr.getTextField(name, TextFieldConst.SIZE_22, ColorEnums.white);
        group.addChild(nameTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, nameTxt, levelbg, [levelbg.width * levelbg.scaleX, 6]);
        // App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenter, nameTxt, infobg, [25, 10]);

        let scoreImg = BaseBitmap.create(`trophy_icon`);
        scoreImg.setScale(0.294);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, scoreImg, nameTxt, [0, nameTxt.height + 5]);
        group.addChild(scoreImg);
       
        let scoreTxt = ComponentMgr.getTextField(isleft ? data.score : data.fscore, TextFieldConst.SIZE_22, ColorEnums.white);
        group.addChild(scoreTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.verticalCenter, scoreTxt, scoreImg);
        scoreTxt.x = scoreImg.x + scoreImg.width * scoreImg.scaleX + 5;

        let diceList = ComponentMgr.getScrollList(BattleLogDiceItem, isleft ? data.line : data.fline, new egret.Rectangle(0,0,245,45),view._iswave);
        group.addChild(diceList);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, diceList, infobg, [8,infobg.height+10]);
        return group;
    }
    
	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
        let view = this;
        view._iswave = false;
		super.dispose();
	}
}