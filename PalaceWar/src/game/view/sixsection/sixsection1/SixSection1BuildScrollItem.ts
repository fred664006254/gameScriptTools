/**
* 兵部建筑 item
* date 2020.5.8
* author ycg
* @name SixSection1BuildScrollItem
*/
class SixSection1BuildScrollItem extends ScrollListItem{
    private _buildItemList:SixSection1BuildItem[] = [];
    private _itemH:number = 0;
    private _data:any = null;

    public constructor() {
        super();
    }

    public initItem(index: number, data: any, param: any): void {
        let bgContainer = new BaseDisplayObjectContainer();
        this.addChild(bgContainer);
        bgContainer.width = GameConfig.stageWidth;
        let container = new BaseDisplayObjectContainer();
        container.width = GameConfig.stageWidth;
        let isBig = param.isBig;
        this._data = data;
        
        let seatType = data.baseCfg.perMaxSeat;
        let seatIndex = data.baseCfg.index;
        let spaceX = 0;
        let itemH:number = 0;
        let count = data.seatNum;
        for (let i = 0; i < count; i++){
            let item = new SixSection1BuildItem();
            item.initItem(i, data, {isBig:isBig});
            container.addChild(item);
            this._buildItemList[i] = item;
            let offX = 0;
            if (seatType == 1){
                offX = container.width/2 - item.width/2 - 14;
            }
            else if (seatType == 5){
                spaceX = 14;
                offX = (container.width - seatType * item.width - (seatType -1) * spaceX)/2 + i%seatType * (item.width + spaceX);
            }
            else if (seatType == 6){
                spaceX = 10;
                if (seatIndex == 3 || seatIndex == 4){
                    spaceX = 15;
                }
                else if (seatIndex == 5 || seatIndex == 6){
                    spaceX = 26;
                }
                if (i < 3){
                    offX = (container.width/2 - 20 - 3 * (item.width + spaceX) + spaceX)/2 + (i % 3) * (item.width + spaceX);
                }
                else {
                    offX = container.width/2 + 20 + (container.width/2 - 20 - 3 * (item.width + spaceX) + spaceX)/2 + (i % 3) * (item.width + spaceX);
                }
            }
            item.x = offX;
            itemH = item.height;
        }
        container.height = itemH;
        container.name = "itemContainer";

        // let item = new SixSection1BuildItem();
        // item.initItem(0, data, {isBig:isBig});
        // itemH = item.height;

        this._itemH = itemH;

        let isMidd:boolean = false;
        let bgName = "";
        if (seatIndex == 0){
            bgName = "sixsection1_seatbg1_down";
        }
        else if (seatIndex == 6){
            bgName = "sixsection1_seatbg6_middle";
            isMidd = true;
        }
        else{
            if (data.isLast){
                bgName = "sixsection1_seatbg"+(seatIndex+1)+"_down";
            }
            else{
                bgName = "sixsection1_seatbg"+(seatIndex+1)+"_middle";
                isMidd = true;
            }
        }

        // App.LogUtil.log("itemH "+itemH + " itemWidth "+item.width);
        let testbg = BaseBitmap.create(bgName);
        let space = 20;
        let totalH = itemH + space;
        if (seatIndex == 6 && data.isLast){
            totalH += 100;
        }
        let offH = totalH % (testbg.height - 1);
        if (offH < 1){ //2
            totalH += 1;
            offH += 1;
        }
        if (isMidd){
            let bgCount = Math.ceil(totalH / (testbg.height - 1));
            for (let i=0; i < bgCount; i++){
                let tmpBg = BaseBitmap.create(bgName);
                bgContainer.addChild(tmpBg);
                tmpBg.y = -1 + (tmpBg.height - 1) * i;
                if (i == bgCount -1){
                    tmpBg.y = -1 + (tmpBg.height - 1) * i - (-1 + (tmpBg.height - 1) * i + tmpBg.height - totalH);
                }
            }
            bgContainer.height = totalH - 1; 
           
        }
        else{
            if (seatIndex == 0){
                let bg = BaseBitmap.create(bgName);
                bgContainer.addChild(bg);
                bgContainer.height = bg.height;
            }
            else{
                if (data.isLast){
                    let bg = BaseBitmap.create(bgName);
                    let downUseOffH = 0;
                    if (seatIndex == 1){
                        downUseOffH = 85;
                    }
                    else if (seatIndex == 2){
                        downUseOffH = 75;
                    }
                    else if (seatIndex == 3){
                        downUseOffH = 20;
                    }
                    else if (seatIndex == 4){
                        downUseOffH = 0;
                    }
                    else if (seatIndex == 5){
                        downUseOffH = 0;
                    }

                    let needH = totalH - downUseOffH;
                    if (needH > 0){
                        let mBgImg = "sixsection1_seatbg"+(seatIndex+1)+"_middle";
                        let mBg = BaseBitmap.create(mBgImg);
                        let bgCount = Math.ceil(needH / (mBg.height - 1));
                        let mOffH = needH % (mBg.height - 1);
                        if (mOffH < 1){ //2
                            needH += 1;
                            mOffH += 1;
                        }
                        for (let i=0; i < bgCount; i++){
                            let tmpBg = BaseBitmap.create(mBgImg);
                            bgContainer.addChild(tmpBg);
                            tmpBg.y = -1 + (tmpBg.height - 1) * i;
                        }
                        let tmpH = needH - 1; //2
                        bg.y = tmpH;
                        bgContainer.height = bg.y + bg.height - 1;
                    }
                    else{
                        bgContainer.height = bg.height - 1;
                    }
                    bgContainer.addChild(bg);
                }
            }
        }

        // for (let i = 0; i < count; i++){
        //     let item = new SixSection1BuildItem();
        //     item.initItem(i, data, {isBig:isBig});
        //     bgContainer.addChild(item);
        //     this._buildItemList[i] = item;
        //     let offX = 0;
        //     if (seatType == 1){
        //         offX = bgContainer.width/2 - item.width/2 - 14;
        //     }
        //     else if (seatType == 5){
        //         spaceX = 14;
        //         offX = (bgContainer.width - seatType * item.width - (seatType -1) * spaceX)/2 + i%seatType * (item.width + spaceX);
        //     }
        //     else if (seatType == 6){
        //         spaceX = 10;
        //         if (i < 3){
        //             offX = (bgContainer.width/2 - 20 - 3 * (item.width + spaceX) + spaceX)/2 + (i % 3) * (item.width + spaceX);
        //         }
        //         else {
        //             offX = bgContainer.width/2 + 20 + (bgContainer.width/2 - 20 - 3 * (item.width + spaceX) + spaceX)/2 + (i % 3) * (item.width + spaceX);
        //         }
        //     }
        //     item.x = offX;
        // }

        this.addChild(container);

        // let lineContainer = new BaseDisplayObjectContainer();
        // container.addChild(lineContainer);
        // lineContainer.height = bgContainer.height;
        // // let lineBg = BaseBitmap.create("sixsectionmainui_linenumbg");
        // let seatH = itemH;
        // let lineBg = BaseBitmap.create("public_9_bg92");;
        // lineBg.width = 30;
        // lineBg.height = bgContainer.height + 2;
        // lineBg.y = -1;
        // lineContainer.addChild(lineBg);
        // lineBg.alpha = 0.6;

        // let lineNum = ComponentManager.getTextField(""+data.lineNum, 14, TextFieldConst.COLOR_WHITE);
        // lineNum.setPosition(lineBg.x + lineBg.width/2 - lineNum.width/2, lineBg.y + seatH/2 - lineNum.height/2 + 15);
        // lineContainer.addChild(lineNum);
        // if (isBig){
        //     lineNum.y = lineBg.y + itemH/2 - lineNum.height/2 + 15 + 30;
        // }
        // let baseIndex = data.baseCfg.index;
        // if (baseIndex == 0){
        //     lineNum.y = 280;
        // }

        let scale = 1;
        if (isBig){
            scale = 2;
        }
        bgContainer.setScale(scale);
        container.setScale(scale);

        this.width = bgContainer.width * scale;
        this.height = bgContainer.height * scale;   
    }

    public freshData(){
        // let lineNum = this._data.lineNum;
        // let mapInfo = Api.sixsection1VoApi.getMapInfoByFloor(lineNum);
        // App.LogUtil.log("update linenum "+lineNum);
        // console.log("build update ", mapInfo);
        for (let i=0; i < this._buildItemList.length; i++){
            this._buildItemList[i].update();
        }
    }

    public playAni(index:number):void{
        let item = this._buildItemList[index-1];
        App.LogUtil.log("playeANI "+index);
        if (item){
            item.showLight();
            let time = 400;
            egret.Tween.get(item, {loop:false}).to({scaleX: 1.2, scaleY: 1.2}, time).to({scaleX: 1, scaleY: 1, alpha: 0.5}, time).to({scaleX: 1.2, scaleY: 1.2, alpha: 1}, time).to({scaleX: 1, scaleY: 1}, time);
        }
    }

    public getSeatItemHeight():number{
        return this._itemH;
    }

    public getItemContainer():BaseDisplayObjectContainer{
        let container = <BaseDisplayObjectContainer>this.getChildByName("itemContainer");
        return container;
    }

    public getSpaceX():number{
        return 0;
    }

    public getSpaceY():number{
        return 0;
    }

    /**
	 * 是否是测量边界，默认true，false是使用this.width和this.height
	 */
	protected checkBounds():boolean
	{
		return false;
	}

    public dispose():void{
        this._buildItemList = [];
        this._data = null;
        super.dispose();
    }
}