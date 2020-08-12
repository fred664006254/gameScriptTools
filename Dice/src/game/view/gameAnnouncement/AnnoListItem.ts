/*
 *@description: 公告列表的 item
 *@author: hwc 
 *@date: 2020-04-16 18:06:54
 *@version 0.0.1
 */

class AnnoListItem extends ScrollListItem {

    constructor(){
        super()
     }
    protected initItem(index:number,data:any,itemParam?:any):void {
        let bg = BaseBitmap.create("annou_0");
        this.addChild(bg);
        bg.height = 270;
        bg.width = 552;
    }

    /**
     * 不同格子X间距
     */
     public getSpaceX():number
    {
        return super.getSpaceX();
    }
    /**
     * 不同格子Y间距
     */
    public getSpaceY():number
    {
        return 20;
    }

    public dispose():void
    {
        super.dispose();
    }
}