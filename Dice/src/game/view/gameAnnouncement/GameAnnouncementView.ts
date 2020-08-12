/*
 *@description: 龙珠公告面板
 *@author: hwc 
 *@date: 2020-04-16 17:36:15
 *@version 0.0.1
 */

class GameAnnouncementView extends PopupView 
{
    private checkBox:CheckBox;

    public initView(){
        let listview = ComponentMgr.getScrollList(AnnoListItem, [1,2,3], new egret.Rectangle(0,0,552,560));
        this.addChildToContainer(listview);
        listview.x = (this.getShowWidth() - listview.width) / 2
        listview.y = 10;

        let tiptxt = ComponentMgr.getTextField('11', TextFieldConst.SIZE_CONTENT_NORMAL_POPUP, ColorEnums.white);
        this.addChildToContainer(tiptxt);
        tiptxt.text = LangMger.getlocal("game_anno_tip");
        tiptxt.x = this.getShowWidth() - tiptxt.width - 10;

        let checkBox = ComponentMgr.getCheckBox();
        this.addChildToContainer(checkBox);
        checkBox.x = tiptxt.x - checkBox.width - 10;;
        checkBox.y = this.getShowHeight() - 50;
        tiptxt.y = checkBox.y + (checkBox.height - tiptxt.height) / 2;
        this.checkBox = checkBox;
        checkBox.setSelected(this.checkFlag());
        // BaseBitmap.create("public_img_mm")
    }

    protected resetBgSize(){
        super.resetBgSize();
        this.setConfirmBtnPosition(205, 650);
    }

    public show(data?:any):void
    {
        super.show(data);
    }

    public closeHandler(){
        localStorage.setItem(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW, (!this.checkBox.checkSelected()).toString());
        let ts = Date.parse((new Date()).toString()) / 1000;
        localStorage.setItem(LocalStorageConst.LOCAL_ANNO_LAST_TIME, ts.toString());
        super.closeHandler();
    }

    protected clickConfirmHandler(){
        this.closeHandler();
    }

    private checkFlag():boolean{
        let flag = localStorage.getItem(LocalStorageConst.LOCAL_ANNOUNCEMENT_LOGIN_SHOW);
		let ts = localStorage.getItem(LocalStorageConst.LOCAL_ANNO_LAST_TIME);
		if(!ts || !flag){
			return false;
		}

		let f = flag == "true";
		
		let tsnum = parseInt(ts);
		let dts = Date.parse((new Date()).toString()) / 1000;
		if(!f && App.DateUtil.isSameDay(dts, tsnum)){
			return true;
		}
        return false;
    }

    // 需要加载的资源
    protected getResourceList():string[]
    {
        return super.getResourceList().concat([
            "annou_0"
        ]);
    }

    // 弹框面板高度，重新该方法后，不会动态计算高度
    protected getShowHeight():number
    {
        return 660;
    }

    // 关闭按钮图标名称
    protected getCloseBtnName():string
    {
        return super.getCloseBtnName();
    }

    // 确认按钮名称
    protected getConfirmBtnName():string
    {
        return super.getConfirmBtnName();
    }

    protected getConfirmBtnStr():string
    {
        return "确定";
    }

    public dispose():void
    {
        this.checkBox = null;
        super.dispose();
    }
}