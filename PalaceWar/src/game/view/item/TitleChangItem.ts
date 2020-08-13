/**
 * 切换头像框item
 * author ycg
 * @class TitleChangeItem
 */
class TitleChangeItem extends BaseDisplayObjectContainer
{
    private _titleId:string|number;
    private _level:number;

	public constructor() 
	{
		super();
    }
    
    public init(index:number, level:any, titleId:string|number):void{
        this._level = level;
        this._titleId = titleId;
        let titleInfo = Api.itemVoApi.getTitleInfoVoById(Number(this._titleId));
        let titleCfg = Config.TitleCfg.getTitleCfgById(titleId);
        let bg = BaseBitmap.create("title_change_item_normalbg");
        this.addChild(bg);
        bg.name = "bg";
        this.width = bg.width;
        this.height = bg.height;
        //等级
        let itemLevel = ComponentManager.getTextField(LanguageManager.getlocal("titleChangeItemLevel", [""+level]), TextFieldConst.FONTSIZE_ACTIVITY_COMMON, TextFieldConst.COLOR_WHITE);
        itemLevel.setPosition(bg.x + bg.width/2 - itemLevel.width/2, bg.y + 15);
        this.addChild(itemLevel);
        itemLevel.name = "level";
        
        if (titleCfg.isTitle == 2){
            let headCircle = App.CommonUtil.getHeadPic(this._titleId, level);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, headCircle, bg, [5, 0]);
            this.addChild(headCircle);
            headCircle.name = "item";
        }
        else if (titleCfg.isTitle == 1 || titleCfg.isTitle == 4){
            let title = App.CommonUtil.getTitlePic(this._titleId, level);
            title.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, title, bg, [0, 0]);
            this.addChild(title);
            title.name = "item";
        }
        
        //mask
        let blackMask = BaseBitmap.create("title_change_mask");
        blackMask.setPosition(bg.x, bg.y);
        this.addChild(blackMask);
        blackMask.name = "blackMask";
        blackMask.visible = false;

        //使用中
        let usingBg = BaseBitmap.create("wifeview_in");
        usingBg.setScale(0.6);
        usingBg.setPosition(bg.x + bg.width/2 - usingBg.width * usingBg.scaleX /2 + 4, bg.y + bg.height - usingBg.height * usingBg.scaleY - 5);
        this.addChild(usingBg);
        usingBg.name = "usingBg";
        usingBg.visible = false;

        //未获得
        let notGetBg = BaseBitmap.create("wifeview_noget");
        notGetBg.setScale(0.6);
        notGetBg.setPosition(bg.x + bg.width/2 - notGetBg.width * notGetBg.scaleX /2 - 7, bg.y + bg.height - notGetBg.height * notGetBg.scaleY + 8);
        this.addChild(notGetBg);
        notGetBg.name = "notGetBg";
        notGetBg.visible = false;

        //特效
        let selectEffect = ComponentManager.getCustomMovieClip("title_change_itemeffect", 9, 80);
        selectEffect.setPosition(bg.x + bg.width/2 - 100, bg.y + bg.height/2 - 133);
        selectEffect.playWithTime(0);
        selectEffect.blendMode = egret.BlendMode.ADD;
        selectEffect.visible = false;
        this.addChild(selectEffect);
        selectEffect.name = "selectEffect";

        this.fresh(level, titleId);
    }

    public fresh(level:number, titleId:string|number):void{
        this._level = level;
        let bg = <BaseBitmap>this.getChildByName("bg");
        let itemLevel = <BaseTextField>this.getChildByName("level");
        let item = <BaseDisplayObjectContainer>this.getChildByName("item");
        let blackMask = <BaseBitmap>this.getChildByName("blackMask");
        let usingBg = <BaseBitmap>this.getChildByName("usingBg");
        let notGetBg = <BaseBitmap>this.getChildByName("notGetBg");

        let titleInfo = Api.itemVoApi.getTitleInfoVoById(Number(titleId));
        let titleCfg = Config.TitleCfg.getTitleCfgById(titleId);
        itemLevel.text = LanguageManager.getlocal("titleChangeItemLevel", [""+level]);
        itemLevel.x = bg.x + bg.width/2 - itemLevel.width/2;
        if (item){
            item.dispose();
            item = null;
        }
        let blackIndex = this.getChildIndex(blackMask);
        if (titleCfg.isTitle == 2){
            item = App.CommonUtil.getHeadPic(titleId, level);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, item, bg, [5, 0]);
            this.addChild(item);
            item.name = "item";
        }
        else if (titleCfg.isTitle == 1 || titleCfg.isTitle == 4){
            item = App.CommonUtil.getTitlePic(titleId, level);
            item.setScale(0.8);
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, item, bg, [0, 0]);
            this.addChild(item);
            item.name = "item";
        }
        this.addChildAt(item, blackIndex - 1);

        notGetBg.visible = false;
        usingBg.visible = false;
        blackMask.visible = false;
        if (titleInfo.num == -1 || titleInfo.lv < level){
            notGetBg.visible = true;
            blackMask.visible = true;
        }
        let usingLevel = this.getCurrTitlePageInfo(titleId);
        App.LogUtil.log("usingLevel: "+usingLevel);
        if (titleCfg.isTitle == 2){
            let pTitle = Api.playerVoApi.getPlayerPtitle();
            if (pTitle.ptitle && pTitle.ptitle == String(titleId) && usingLevel && usingLevel == level){
                usingBg.visible = true; 
            }
        }
        else{
            let titleData = Api.playerVoApi.getTitleInfo();
            App.LogUtil.log("titleData: "+titleData.title);
            if (titleData.title && titleData.title == String(titleId) && usingLevel && usingLevel == level){
                usingBg.visible = true;
            }
        }
    }

    public setSelect(isSel:boolean):void{
        let effect = <CustomMovieClip>this.getChildByName("selectEffect");
        let bg = <BaseBitmap>this.getChildByName("bg");
        effect.visible = isSel;
        if (isSel){
            bg.setRes("title_change_item_selectbg");
        }
        else{
            bg.setRes("title_change_item_normalbg");
        }
    }

    private getCurrTitlePageInfo(titleId:string|number):number{
        let titleCfg = Config.TitleCfg.getTitleCfgById(titleId);
        if (titleCfg.isTitle == 2){
            let pTitle = Api.playerVoApi.getPlayerPtitle();
            if (String(this._titleId) == pTitle.ptitle){
                let index = 0;
                for (let i = 0; i < titleCfg.changePic.length; i ++){
                    let tmplv = Number(titleCfg.changePic[i]);
                    if(pTitle.plv >= tmplv){
                        index = Number(i) + 1;
                    }
                }
                return titleCfg.changePic[index - 1];
            }
        }
        else if (titleCfg.isTitle == 1 || titleCfg.isTitle == 4){
            let titleData = Api.playerVoApi.getTitleInfo();
            if (String(this._titleId) == titleData.title){
                let index = 0;
                for (let i = 0; i < titleCfg.changePic.length; i ++){
                    let tmplv = Number(titleCfg.changePic[i]);
                    if(titleData.tlv >= tmplv){
                        index = Number(i) + 1;
                    }
                }
                return titleCfg.changePic[index - 1];
            }
        }
        return null;
    }

	public dispose(): void {
        this._titleId = null;
        this._level = null;
		super.dispose();
	}
}