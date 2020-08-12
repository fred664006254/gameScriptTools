namespace App
{
	export namespace DragonBonesUtil 
	{
		export function getDragonBones(dbName:string):dragonBones.EgretArmatureDisplay
		{
			var dragonbonesData = ResMgr.getRes(dbName+"_ske");  
			var textureData = ResMgr.getRes( dbName+"_tex_json" );  
			var texture = ResMgr.getRes( dbName+"_tex_png" );
			if(!dragonbonesData || !textureData || !texture)
			{
				return null;
			}
			let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
			if(!egretFactory.getDragonBonesData(dbName)||!egretFactory.getTextureAtlasData(dbName))
			{
				removeDragonBones(dbName);
			}
			if(!egretFactory.getDragonBonesData(dbName))
			{
				egretFactory.parseDragonBonesData(dragonbonesData);
			}
			if(!egretFactory.getTextureAtlasData(dbName))
			{
				egretFactory.parseTextureAtlasData(textureData, texture);
			}
			let armatureDisplay: dragonBones.EgretArmatureDisplay = egretFactory.buildArmatureDisplay(dbName);
			// armatureDisplay.animation.play("run",0);
			return armatureDisplay;
		}

		export function removeDragonBones(dbName:string):void
		{
			let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
			egretFactory.removeDragonBonesData(dbName);
			egretFactory.removeTextureAtlasData(dbName);
		}

		export function getLoadDragonBones(dbName:string,playTimes:number=0,idle:string="idle",completeFunc?:any,completeObj?:any):BaseLoadDragonBones
		{
			return new BaseLoadDragonBones(dbName,playTimes,idle,completeFunc,completeObj);
		}

		export function clear():void
		{
			let egretFactory: dragonBones.EgretFactory = dragonBones.EgretFactory.factory;
			if(egretFactory)
			{
				egretFactory.clear();
			}
		}
	}
}