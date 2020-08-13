/**
* 奖池展示
* date 2020.6.1
* author ycg
* @name AcMouseComeDetailPopupViewTab3
*/
class AcMouseComeDetailPopupViewTab3 extends CommonViewTab{

    public constructor(data?:any) {
        super();
        this.param = data;
        this.initView();
    }

    private get code():string{
        return this.param.data.code;
    }

    private get aid():string{
        return this.param.data.aid;
    }

    private get vo():AcMouseComeVo{
        return <AcMouseComeVo>Api.acVoApi.getActivityVoByAidAndCode(this.aid, this.code);
    }

    private get cfg():Config.AcCfg.MouseComeCfg{
        return Config.AcCfg.getCfgByActivityIdAndCode(this.aid, this.code);
    }

    public initView():void{
        let bg = BaseBitmap.create("public_9_bg93");
        bg.width = 530;
        bg.height = 695;
        bg.setPosition(26, 53);
        this.addChild(bg);

        let dataList = this.getDataList();
        let rect = new egret.Rectangle(0, 0, 530, 680);
        let scrollList = ComponentManager.getScrollList(AcMouseComeDetailScrollItem3, dataList, rect, {aid:this.aid, code:this.code});
        scrollList.setPosition(bg.x, bg.y + 5);
        this.addChild(scrollList);
    }

    public getDataList():any[]{
        let data = this.cfg.bigReward;
        let list:any[] = [];
        for (let i=0; i < data.length; i++){
            let tmpData = {id: i+1, getReward: data[i].getReward, type: 1};
            list.push(tmpData);
        }
        list.push({id: list.length + 1, getReward: this.cfg.getPoolRewards(), type: 0});
        return list;
    }

    public dispose():void{
        
        super.dispose();
    }
}