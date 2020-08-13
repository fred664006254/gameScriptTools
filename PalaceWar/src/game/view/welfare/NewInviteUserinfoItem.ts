/**
 * 新邀请有礼邀请玩家item
 * author qianjun
 */
class NewInviteUserinfoItem extends ScrollListItem{

	public constructor() {
		super();
	}

	protected initItem(index:number,data:any){
		let view = this;
        view.width = 510;
        view.height = 95;

        let bg = BaseBitmap.create("public_popupscrollitembg");//threekingdomsranklistbg
        bg.width = view.width;
        bg.scaleY = 0.72;
        view.addChild(bg);

        let rankbg = BaseBitmap.create("rankinglist_rankbg");
        App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, rankbg, bg, [15,0]);
        view.addChild(rankbg);

        let idTxt = ComponentManager.getTextField(`${index+1}`,TextFieldConst.FONTSIZE_TITLE_SMALL);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCenterverticalCenter, idTxt, rankbg);
        view.addChild(idTxt);

        let Txt1 = ComponentManager.getTextField(LanguageManager.getlocal(`newinviteuserinfo1`, [data.name]),20,TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, Txt1, bg, [65,20]);
        view.addChild(Txt1);

        let Txt2 = ComponentManager.getTextField(LanguageManager.getlocal(`newinviteuserinfo2`, [data.uid]),20,TextFieldConst.COLOR_BLACK);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, Txt2, Txt1, [0,Txt1.textHeight+7]);
        view.addChild(Txt2);

        let Txt3 = ComponentManager.getTextField(LanguageManager.getlocal(`newinviteuserinfo3`, [App.StringUtil.changeIntToText(data.power)]),20,TextFieldConst.COLOR_BLACK);
        Txt3.y = Txt2.y;
        Txt3.x = bg.x + bg.width - Txt3.width - 35;
        view.addChild(Txt3);

	}
    
	public dispose():void{
		super.dispose();
	}
}