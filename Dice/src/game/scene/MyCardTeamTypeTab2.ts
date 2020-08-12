/**
 * 出站骰子队列2
 * author qianjun
 */
class MyCardTeamTypeTab2 extends CommonViewTab
{
    private _scrollList:ScrollList;
    private _teamid = 2;
    private _curdice = ``;
    private _tipTxt : BaseTextField = null;
    private _btn : BaseButton = null;
    private _iconbg : BaseBitmap = null;
    private _levelTxt : BaseTextField = null;
    private _nameTxt : BaseTextField = null;
    private _iconGroup : BaseDisplayObjectContainer = null;
    private _progressbar : ProgressBar = null;
    private _arrow : BaseBitmap = null;
    private _maxlevel : BaseBitmap = null;
    private _isBeginning:boolean=false;
    private _selectLinePos : number = -1;
    private _point : egret.Point = null;
    
	public constructor() {
		super();
		this.initView();
    }

    public refreshWhenSwitchBack():void{
        let view = this;
        view.setUseInfoShow(false);
        let line = Api.LineVoApi.getLineInfoById(view._teamid);
        view._scrollList.refreshData(line, view._teamid);
    }

	public initView():void{
        let view = this;
        view.initEventListener();
		view.width = 560;
		view.height = 145;

		let rectH1 = view.height - 10;
        let rect = new egret.Rectangle(0, 0, 575, 160);

        let line = Api.LineVoApi.getLineInfoById(view._teamid);
        // for(let index = 0; index < line.length; index++){
        //     line[index]["tip"] = true;
        // }
        let list = ComponentMgr.getScrollList(DiceTeamItem,line,rect,view._teamid);
        list.verticalScrollPolicy = `off`;
        list.horizontalScrollPolicy = `off`;
		view.addChild(list);
        view._scrollList = list;
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, list, view, [-3,15]);
        // view.refreshRankList();

        //使用信息部分
        let tipTxt = ComponentMgr.getTextField(LangMger.getlocal(`dicemovetip`), TextFieldConst.SIZE_30, ColorEnums.white);
        tipTxt.stroke = 2;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, tipTxt, list, [0,list.height + 85]);
        view.addChild(tipTxt);
        view._tipTxt = tipTxt;

        let btn = ComponentMgr.getButton(ButtonConst.BTN_COMMON_YELLOW, LangMger.getlocal(`canelStr`), ()=>{
            view.setUseInfoShow(false);
            App.MsgHelper.dispEvt(MsgConst.DICE_CHANGETOTEAM, {
                show : true
            });
        }, view)
        view.addChild(btn);
        view._btn = btn;
        App.DisplayUtil.setLayoutPosition(LayoutConst.righttop, btn, list, [0,list.height+125]);

        let bg = BaseBitmap.create(``);
        view._iconbg = bg;
        view.addChild(bg);

        let nameTxt = ComponentMgr.getTextField(``, TextFieldConst.SIZE_CONTENT_NORMAL_POPUP);
        view._nameTxt = nameTxt;
        view.addChild(nameTxt);

        let iconGroup = new BaseDisplayObjectContainer();
        view._iconGroup = iconGroup;
        iconGroup.width = 110 ;//BattleStatus.diceSize.width * DiceScaleEnum.scale_53;
        iconGroup.height = 110;//BattleStatus.diceSize.height * DiceScaleEnum.scale_53;;
        iconGroup.anchorOffsetX = iconGroup.width / 2;
        iconGroup.anchorOffsetY = iconGroup.height / 2;
        view.addChild(iconGroup);
        iconGroup.addTouch(view.touchHandler,view);

        
        let levelTxt = ComponentMgr.getTextField(``, TextFieldConst.SIZE_18);
        view._levelTxt= levelTxt;
        view.addChild(levelTxt);

        //最大等级
        let maxlevel = BaseBitmap.create(`dicelevelmax`);
        view.addChild(maxlevel);
        view._maxlevel = maxlevel;
        //进度条
        let progressbg = `progress24`;
        let arrowres = `public_arrowblue`;
        let progressbar = ComponentMgr.getProgressBar(progressbg,`progress_bg_1`,120);
        progressbar.setTextSize(TextFieldConst.SIZE_18);
        view.addChild(progressbar);
        view._progressbar = progressbar;

        let arrow = BaseBitmap.create(arrowres);
        arrow.setScale(0.55);
        view.addChild(arrow);
        view._arrow = arrow;
        arrow.visible = false;

        view.setUseInfoShow(false);
    }

    public openChangeTeam(dice : string, width : number, height : number):void{
        let view = this;
        view._curdice = dice;
        //打开编辑模式
        let line = Api.LineVoApi.getLineInfoById(view._teamid);
        for(let i = 0 ;i < line.length; ++ i){
            let item = <DiceTeamItem>view._scrollList.getItemByIndex(i);
            item.openChangeTeam(dice, view._teamid);
            item.setTween();
        }
        view.createChangeTeamGroup(dice);
        view.setUseInfoShow(true);
    }

    private useBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            let line = Api.LineVoApi.getLineInfoById(view._teamid);
            for(let i = 0 ;i < line.length; ++ i){
                let item = <DiceTeamItem>view._scrollList.getItemByIndex(i);
                item.freshInfo();
                item.closeChangeTeam();
                item.rmTween();
            }
            view.setUseInfoShow(false);
        }
        view._curdice = ``;
    }

    private setUseInfoShow(flag : boolean):void{
        let view = this;
        view._tipTxt.visible = view._btn.visible = view._nameTxt.visible = view._iconbg.visible = view._iconGroup.visible = view._levelTxt.visible = view._progressbar.visible = flag;
        if(!flag){
            view._maxlevel.visible = false;
            view._arrow.visible = false;
            view._curdice = ``;
            let clip = <CustomMovieClip>view.getChildByName("guangxiao");
            if(clip) clip.visible = false;
            let glow = <CustomMovieClip>view.getChildByName("glow");
            if(glow) glow.visible = false;
            let line = Api.LineVoApi.getLineInfoById(view._teamid);
            for(let i = 0 ;i < line.length; ++ i){
                let item = <DiceTeamItem>view._scrollList.getItemByIndex(i);
                item.freshInfo();
                item.closeChangeTeam();
                item.rmTween();
            }
        }
    }

    private createChangeTeamGroup(dice : string):void{
        let view = this;

        let dicecfg = Config.DiceCfg.getCfgById(dice);

        let bg = view._iconbg;
        bg.setRes(`bird_item_${dicecfg.quality}`);
        // if(dicecfg.quality != 4){
        //     bg.width = 142;
        //     bg.height = 182;
        // }
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, bg, view._tipTxt, [0,view._tipTxt.height+85]);

        let nameTxt = view._nameTxt;
        nameTxt.text = dicecfg.name;
        nameTxt.setColor(GameConfig.getQualityColor(dicecfg.quality));
        nameTxt.stroke = 2;
        nameTxt.strokeColor = 0x000000;
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, nameTxt, bg, [0,8]);

        if(dicecfg.quality == 4){
            // 传奇卡牌的特效
            let clip = <CustomMovieClip>view.getChildByName("guangxiao");
            if(!clip){
                clip= ComponentMgr.getCustomMovieClip("guangxiao", 10); 
                view.addChild(clip);
                this.setChildIndex(clip, this.getChildIndex(view._iconGroup));
            }
            clip.name = "guangxiao";
            clip.blendMode = egret.BlendMode.ADD;
            clip.setEndCallBack(()=>{
                clip.dispose();
                clip = null;
            },this);
            clip.visible = true;
            clip.playWithTime(0);
            clip.setPosition(bg.x + 20, bg.y + 20);

            let glow = <CustomMovieClip>view.getChildByName("glow");
            if(!glow){
                glow = ComponentMgr.getCustomMovieClip("glow");
                view.addChild(glow);
                this.setChildIndex(glow, this.getChildIndex(view._nameTxt));
            }
            glow.visible = true;
            glow.name = "glow";
            glow.playWithTime(0);
            glow.blendMode = egret.BlendMode.ADD;
            glow.x = bg.x;
            glow.y = bg.y - 15;
            nameTxt.y = nameTxt.y + 10;
        } else {
            let clip = <CustomMovieClip>view.getChildByName("guangxiao");
            if(clip) clip.visible = false;
            let glow = <CustomMovieClip>view.getChildByName("glow");
            if(glow) glow.visible = false;
        }

        if(view._iconGroup){
            view._iconGroup.removeChildren();
        }
        let iconGroup = App.CommonUtil.getDiceIconById(dice,1);
        view._iconGroup.addChild(iconGroup);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, view._iconGroup, bg);
        view._point = new egret.Point(view._iconGroup.x, view._iconGroup.y);
     
        let level = Api.DiceVoApi.getDiceLvById(dice);
        let levelTxt = view._levelTxt;
        levelTxt.text = LangMger.getlocal(`sysLevel`, [level.toString()]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, levelTxt, bg, [9,15]);

        let ismaxlevel = level == dicecfg.maxGrade;
     
        //最大等级
        let maxlevel = view._maxlevel;
        App.DisplayUtil.setLayoutPosition(LayoutConst.rightbottom, maxlevel, bg, [7,40]);
        maxlevel.visible = ismaxlevel;

        //已获得
        let havenum = Api.DiceVoApi.getDiceNumById(dice);
        let neednum = dicecfg.getNextLvCostNumByLv(level + 1);
        let ishave = Api.DiceVoApi.isHaveDiceById(dice);
        let canlevelup = ishave && havenum >= neednum && !ismaxlevel;
        //进度条
        let progressbg = `progress24`;
        let arrowres = `public_arrowblue`;
        if(ismaxlevel){
            progressbg = `progress26`;
            arrowres = ``;
        }
        else if(canlevelup){
            arrowres = `public_arrowgreen`;
            progressbg = `progress25`;
        }

        let progressbar = view._progressbar;
        progressbar.changeRes(progressbg, `progress_bg_1`);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, progressbar, bg, [0,bg.height+10]);

        progressbar.setPercentage(ismaxlevel ? 1 : Math.min(1,havenum/neednum));
        progressbar.setText(ismaxlevel ? `${havenum}` : `${havenum}/${neednum}`);
        progressbar.setTextColor(ColorEnums.white);

        if(arrowres != ``){
            view._arrow.setRes(arrowres);
            view._arrow.visible = true;
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, view._arrow, progressbar, [-9,0]);
        }
        else{
            view._arrow.visible = false;
        }
    }


    private touchHandler(e:egret.TouchEvent):void{
        let view = this;
        let diceList=view._scrollList;
        switch (e.type) {
            case egret.TouchEvent.TOUCH_BEGIN:
                if(view._isBeginning==false){
                    view._isBeginning=true;
                }
                break;
            case egret.TouchEvent.TOUCH_MOVE:
                if(view._isBeginning){
                    let x = e.stageX - 40;
                    let y = e.stageY - 72 - 81 - 90;
                    view._iconGroup.setPosition(x,y);
                }
                break;
            case egret.TouchEvent.TOUCH_CANCEL:
                if(view._isBeginning){
                    view._iconGroup.setPosition(view._point.x, view._point.y);
                    view._isBeginning=false;
                }
            case egret.TouchEvent.TOUCH_END:
                if(view._isBeginning){
                    view.checkCanUse();
                    view._isBeginning=false;
                    view._iconGroup.setPosition(view._point.x, view._point.y);
                }
            default:
                break;
        }
    }

    private checkCanUse():void{
        let view = this;
        let line = Api.LineVoApi.getLineInfoById(view._teamid);
        for(let i = 0; i < line.length; ++ i){
            let item = <DiceTeamItem>view._scrollList.getItemByIndex(i);
            let point = new egret.Point(item.x + view._scrollList.x + (103/2), item.y + view._scrollList.y + 5 + (103/2));
            //检测是否 圆心重合即可
            if(view.getDistance(point, new egret.Point(view._iconGroup.x, view._iconGroup.y)) <= (view._iconGroup.width / 2)){
                item.sendClick(view._curdice,view._teamid);
                //item.dispatchEvent(new egret.Event(egret.TouchEvent.TOUCH_TAP));
                break;
            }
        }
    }

    private getDistance(point1:egret.Point, point2:egret.Point):number{
        return Math.sqrt(Math.pow(point1.x  - point2.x, 2) + Math.pow(point1.y  - point2.y, 2));
    }

    private upgardeBack(evt : egret.Event):void{
        let view = this;
        if(evt.data.ret){
            //App.CommonUtil.showTip(LangMger.getlocal(`sysUpgardeSucc`));
            let line = Api.LineVoApi.getLineInfoById(view._teamid);
            view._scrollList.refreshData(line, view._teamid);
        }
    }

    protected getNetConstEventArr():string[]{
		return [
			NetConst.DICE_USE, NetConst.DICE_UPGRADE
		];
	}

	protected netEventCallBack(evt : egret.Event):void{
		let view = this;
		switch(evt.type){
			case NetConst.DICE_USE:
				view.useBack(evt);
                break;
            case NetConst.DICE_UPGRADE:
                view.upgardeBack(evt);
                break;
		}
    }

    public dispose(){
        let view = this;
        view._tipTxt = null;
        view._btn = null;
        view._iconbg = null;
        view._levelTxt = null;
        view._nameTxt = null;
        view._iconGroup = null;
        view._progressbar = null;
        view._arrow = null;
        view._scrollList = null;
        view._teamid = 1;
        view._maxlevel = null;
        view._isBeginning = false;
        view._selectLinePos = -1;
        view._point = null;
        view._curdice = ``;
        super.dispose();
    }
}