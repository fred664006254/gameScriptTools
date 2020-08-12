/**
 * 在公平竞技场中使用的item
 * 重新实现点击回调
 */

 class DiceTeamItem1 extends DiceTeamItem{
    protected bgOnclick(obj, evt:egret.Event){
        if(this.status === 2){
            return;
        }
        ViewController.getInstance().openView(ViewConst.DICEDETAILINFOVIEW,{
            dice : this._data.id,
            check : true,
            // inbattle : true,
            info:{
                lv:Config.FairarenaCfg.getDiceLv()
            }
        });
    }
 }