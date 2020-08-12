
class UpdateNoticeItem extends ScrollListItem {

    private _data : any = null;

	public constructor() {
		super();
    }
    
	protected initItem(index : number, data : any, param:any) {
        let view = this;
        view._data = data;
        view.width = 516;
        view.height = 100 + 10;
        //updatenotice_bg
        let btn = BaseBitmap.create(`updatenotice_tab`);
        // btn.width = view.width - 2;
        // btn.height = view.height - 10;
        view.addChild(btn);
        App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, btn, view, [0,0], true);
        btn.addTouchTap(()=>{
            App.MsgHelper.dispEvt(MsgConst.UPDATELOG_SHOWIDX,{
                show : 1,
                idx : index
            });
        },view);

        let key : string = data.key;
        let main = key.split(`|`);
        let cn = data.content;

        let version = main[1].replace(/-/g,`.`);
        let datest = main[0];

        let titleTxt = ComponentMgr.getTextField(LangMger.getlocal(`updatelogtitle`, [version]), TextFieldConst.SIZE_28, ColorEnums.white);
        let dateTxt = ComponentMgr.getTextField(datest, TextFieldConst.SIZE_22, ColorEnums.white);
        view.addChild(titleTxt);
        view.addChild(dateTxt);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, titleTxt, btn, [17,10]);
        App.DisplayUtil.setLayoutPosition(LayoutConst.lefttop, dateTxt, titleTxt, [0,titleTxt.textHeight+22]);

        if(data.show){
            let contentBg = BaseBitmap.create(`updatenotice_bg`);
            // contentBg.width = view.width;
            view.addChild(contentBg);

            let contentTxt = ComponentMgr.getTextField(data.content, TextFieldConst.SIZE_22, ColorEnums.black);
            view.addChild(contentTxt);
            contentTxt.lineSpacing = 6;

            // contentBg.height = contentTxt.textHeight + 40;
            App.DisplayUtil.setLayoutPosition(LayoutConst.horizontalCentertop, contentBg, btn, [0, 50]);
            App.DisplayUtil.setLayoutPosition(LayoutConst.leftverticalCenter, contentTxt, contentBg, [22,0]);
            view.height = btn.height + contentBg.height + 10;
        }
    }

	public getSpaceY(): number {
		return 0;
    }
    
	public getSpaceX(): number {
		return 0;
    }
    
	public dispose(): void {
        let view = this;
		super.dispose();
	}
}