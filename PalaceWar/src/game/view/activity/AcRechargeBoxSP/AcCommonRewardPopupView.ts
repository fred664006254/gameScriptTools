/**
 * 通用衣装预览 头像框预览
 * author ycg
 * date 2019.10.10
 * @class AcCommonRewardPopupView
 */
class AcCommonRewardPopupView extends PopupView{

    private tabGroup = null;
    private viewData:any = [];
    private selectedIndex:number = 0; 
    private lastSelectedIndex:number = 0;

    public constructor(){
        super();
    }
    /**
     * 数据类型 {data:[{
     * idType: "0_8_1", 
     * topMsg: "", 
     * title:"", bgName:"", scale:0, offY:0}, 
     * {id: "0_1", type:"", 
     * topMsg: "", title:"", bgName:""}], showType:"0_8", title:"奖励预览""}
     * 
     * idType: 格式为 rewardItemVo 类型 "type_id_num"  type: 8 门客 10红颜  11 称号 16 红颜皮肤 19 门客皮肤 0 为其他任意面板  可通过调用 配置中的formatRewardItemVoStr(id:number|string) 格式化id为itemVo通用类型
     * * 需注意：当type 为0时，id需依次累加，不可重复  新加面板需继承 BaseLoadDisplayObjectContiner 多个页签时可传入title
     * topMsg: 顶部消息 必传
     * title 标题或者标签 可选择
     * bgName 衣装背景图 可选择 尺寸须统一
     * scale 缩放比例 可选
     * showType:  为需要跳转的指定页签 参数同idType
     * title: 多个页签使用，可不传，默认为 奖励预览
     */
    public initView():void{
        let tabTextArr:string[] = this.getTabbarArr();
        if (tabTextArr.length < 2){
            let viewClass = this.getTabViewClassByIdType(this.data.data[this.selectedIndex].idType);
            let tabveiwClass:any = egret.getDefinitionByName(viewClass);
            let view = new tabveiwClass(this.data.data[this.selectedIndex]);
            view.show();
            this.addChildToContainer(view);
            view.setPosition(41, 0); //13 2
        }
        else if (tabTextArr.length < 5) {
            let tabbarGroup:TabBarGroup = ComponentManager.getTabBarGroup(ButtonConst.BTN2_SMALL_TAB, tabTextArr, this.tabBtnClickHandler, this);
            tabbarGroup.setPosition(25+GameData.popupviewOffsetX,0); //35 10
            tabbarGroup.setSpace(0);
            tabbarGroup.setColor(0xe1ba86,0x472c26);
            this.addChildToContainer(tabbarGroup);
            this.tabGroup = tabbarGroup;

            if (this.data.showType){
                this.changeTabByIdType(this.data.showType);
            }
            else{
                this.changeTabByIdType(this.data.data[0].idType);
            }
        }
        else{
            let tabbarGroup:TabBarGroup = ComponentManager.getScroTabBarGroup(ButtonConst.BTN2_SMALL_TAB, tabTextArr, this.tabBtnClickHandler, this, null, TabBarGroup.ALIGN_HORIZONTAL, 520, false, null, 66);
            tabbarGroup.setPosition(25+GameData.popupviewOffsetX, 0); //35 10
            this.addChildToContainer(tabbarGroup);
            tabbarGroup.setColor(0xe1ba86,0x472c26);
            this.tabGroup = tabbarGroup;
            tabbarGroup.setSpace(0);
            if (this.data.showType){
                this.changeTabByIdType(this.data.showType);
            }
            else{
                this.changeTabByIdType(this.data.data[0].idType);
            }
        }
    }

    public changeTabByIdType(idType:string):void{
        let index = this.getIndexofIdType(idType);
        let data = {index:index};
        this.tabGroup.selectedIndex = index;
        this.tabBtnClickHandler(data);
    }

    public tabBtnClickHandler(params:any):void{
        let index = params.index;
        this.lastSelectedIndex = this.selectedIndex;
        this.selectedIndex = index;
        let view = null;
        if (this.lastSelectedIndex != this.selectedIndex && this.viewData[this.lastSelectedIndex]){
            this.removeChildFromContainer(this.viewData[this.lastSelectedIndex]);
        }
        if (this.viewData[this.selectedIndex]){
            view = this.viewData[this.selectedIndex];
            this.addChildToContainer(this.viewData[this.selectedIndex]);
            this.viewData[this.selectedIndex] = view;
        }
        else{
            let viewClass = this.getTabViewClassByIdType(this.data.data[this.selectedIndex].idType);
            let tabveiwClass:any = egret.getDefinitionByName(viewClass);
            view = new tabveiwClass(this.data.data[this.selectedIndex]);
            view.show();
            this.viewData[this.selectedIndex] = view;
            this.addChildToContainer(view);
        }
        view.setPosition(41, this.tabGroup.y + this.tabGroup.height); //13
    }

    public getTabViewClassByIdType(idType:string):any{
        let ids = idType.split("_");
        let type = ids[0];
        if (Number(ids[1]) > 0){
            if (type == "8" || type == "10" || type == "16" || type == "19"){
                return "AcCommonRewardClothesView";
            }
            else if (type == "11"){
                return "AcCommonRewardHeadTitleView";
            } 
        }
        else{
            //在此可添加其他面板 有交互的面板 类型必须为0 id依次累加 在此加类名

        }
    }

    //获取数据的index
    public getIndexofIdType(idType:string):number{
        let data = this.data.data;
        for (let i = 0; i < data.length; i++){
            if (data[i].idType == idType){
                return i;
            }
        }
        return 0;
    }

    //tabbar 数组
    public getTabbarArr():string[]{
        let tabName:string[] = [];
        let data = this.param.data.data;
        for (let i = 0; i < data.length; i++){
            if (data[i].title){
                tabName.push(data[i].title);
            }
            else {
                let type = (data[i].idType).split("_")[0];
                tabName.push(this.getTitleNameByType(type));
            }
        }
        return tabName;
    }

    //8 门客 10红颜  11 称号 16 红颜皮肤 19 门客皮肤
    public getTitleNameByType(type:string):string{
        if (type == "8"){
            return "acCommonClothesServantTitle";
        }
        else if (type == "10"){
            return "acCommonClothesWifeTitle";
        }
        else if (type == "19"){
            return "acCommonClothesServantSkinTitle";
        }
        else if (type == "16"){
            return "acCommonClothesWifeSkinTitle";
        }
        else if (type == "11"){
            return "acCommonClothesHeadTitle";
        }
        
        return "acCommonClothesTitle";
    }

    //传入的数据
    public get data(){
        return this.param.data;
    }

    //标题
    protected getTitleStr(): string {
        let titleStr = "acCommonClothesTitle";
        if (!this.param || !this.param.data){
            return titleStr;
        }
        let data = this.param.data.data;
        if (data && data.length < 2){
            if (data[0].title){
                titleStr = data[0].title;
            }
            else{
                let type = (data[0].idType).split("_")[0];
                titleStr = this.getTitleNameByType(type);
            }
        }
        else if (this.param.data.title){
            titleStr = this.param.data.title;
        }
		return titleStr;
    }
    
    protected getShowHeight():number{
        let arrLen = this.getTabbarArr().length;
        if (arrLen < 2){
            return 797;
        }
        return 840;
    }

    protected getBgName():string{
		return `popupview_bg3`;
	}

	protected getCloseBtnName():string{
		return `popupview_closebtn2`;
    }
    
    public getResourceList():string[]{
        return super.getResourceList().concat([
            "acthreekingdomrecharge_topbg",
            "acthreekingdomrecharge_topbgline"
        ])
    }

    protected getOffsetY():number
	{			
		return 17;
	}


    public dispose(){
        if(this.viewData)
		{
			for(var key in this.viewData)
			{
				var view = this.viewData[key];
				if(view)
				{
					if(this.container.contains(view))
					{
						this.removeChildFromContainer(view);
					}
					view.dispose();
					view = null;
				}
			}
		}
        this.viewData = [];
        this.selectedIndex = 0;
        this.lastSelectedIndex = 0;
        this.tabGroup = null;
        super.dispose();
    }
}