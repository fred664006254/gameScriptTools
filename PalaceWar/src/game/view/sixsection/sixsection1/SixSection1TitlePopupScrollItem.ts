/**
* 兵部头衔 item
* date 2020.5.11
* author ycg
* @name SixSection1TitlePopupScrollItem
*/
class SixSection1TitlePopupScrollItem extends ScrollListItem{
    private _titleItemList:SixSection1TitlePopupTitleItem[] = [];

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, param: any): void {
        let container = new BaseDisplayObjectContainer();
        this.addChild(container);
        this.width = 522;
        container.width = 480;

        let baseCfg = data.baseCfg;
        if (data.isFirst){
            let titleBgStr = "sixsection1_titlenamebg"+ (data.baseCfg.index+1);
            if (!ResourceManager.hasRes(titleBgStr)){
                titleBgStr = "sixsection1_titlenamebg4";
            }
            let titleBg = BaseBitmap.create(titleBgStr);
            titleBg.x = 42 + (this.width - 42)/2 - titleBg.width/2;
            this.addChild(titleBg);
            container.y = titleBg.height + 20;
            
            let titleTxt = BaseBitmap.create("sixsection1_titlename"+ (data.baseCfg.index+1));
            titleTxt.x = 42 + (this.width - 42)/2 - titleTxt.width/2;
            titleTxt.y = titleBg.y + 5;
            this.addChild(titleTxt);
            container.y = titleTxt.height + 20;
        }

        container.x = 42;
        
        let seatType = baseCfg.perMaxSeat;
        let spaceX = 0;
        let itemH:number = 0;
        for (let i = 0; i < data.seatNum; i++){
            let item = new SixSection1TitlePopupTitleItem();
            item.initItem(i, data, null);
            container.addChild(item);
            this._titleItemList[i] = item;
            let offX = 0;
            if (seatType == 1){
                offX = container.width/2 - item.width/2;
            }
            else if (seatType == 5){
                spaceX = 14;
                offX = (container.width - seatType * item.width - (seatType -1) * spaceX)/2 + i%seatType * (item.width + spaceX);
            }
            item.x = offX;
            itemH = item.height;
        }
        container.height = itemH;
        
        this.height = container.y + container.height + this.getSpaceY();

        let lineContainer = new BaseDisplayObjectContainer();
        this.addChild(lineContainer);
        let lineBg = BaseBitmap.create("sixsectionmainui_linenumbg1");
        // let lineBg = BaseBitmap.create("public_9_bg92");
        lineBg.width = 30;
        lineBg.height = this.height+ 1;
        lineContainer.width = lineBg.width;
        lineContainer.height = lineBg.height;
        lineContainer.addChild(lineBg);
        // lineBg.alpha = 0.6;

        let lineNum = ComponentManager.getTextField(""+data.lineNum, 14, TextFieldConst.COLOR_WHITE);
        lineNum.setPosition(lineBg.x + lineBg.width/2 - lineNum.width/2, container.y + (container.height - 30)/2 - lineNum.height/2);
        lineContainer.addChild(lineNum);

        // App.LogUtil.log("title item h "+this.height);
        
    }

    public freshData(){
        for (let i=0; i < this._titleItemList.length; i++){
            this._titleItemList[i].update();
        }
    }

    public playAni(index:number):void{
        App.LogUtil.log("playani "+index);
        let item = this._titleItemList[index-1];
        if (item){
            item.playAni();
        }
    }

    public getSpaceX():number{
        return 0;
    }

    public getSpaceY():number{
        return 5;
    }

    public dispose():void{
        this._titleItemList = [];

        super.dispose();
    }
}