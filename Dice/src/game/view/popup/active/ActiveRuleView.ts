class ActiveRuleView extends PopupView 
{
    public initView(){
        let arr = this.param.data.acInfoArr;
        if(arr){
            let rulelist = ComponentMgr.getScrollList(AcRuleItem,arr,new egret.Rectangle(0,0,506, 500));
            this.addChildToContainer(rulelist);
            rulelist.x = 10;
        }
    }

    // 初始化标题
    protected initTitle():void
    {
        super.initTitle();
    }

    public show(data?:any):void
    {
        super.show(data);
    }

    // 需要加载的资源
    protected getResourceList():string[]
    {
        return super.getResourceList();
    }

    // 弹框面板宽度，高度动态计算
    protected getShowWidth():number
    {
        return super.getShowWidth();
    }

    // 弹框面板高度，重新该方法后，不会动态计算高度
    protected getShowHeight():number
    {
        return super.getShowHeight();
    }

    // 计算背景高度时使用，在container高度的基础上添加该高度
    protected getBgExtraHeight():number
    {
        return 110;
    }

    // 背景图名称
    protected getBgName():string
    {
        return super.getBgName();
    }

    // 弹窗标题
    protected getTitleStr():string{
        return this.param.data.title ? this.param.data.title : LangMger.getlocal("fairArena");
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
        return LangMger.getlocal("sysconfirm");
    }

    public dispose():void
    {
        super.dispose();
    }
}