namespace Config
{
	export namespace GamepaceCfg 
    {   
        let weapon_name_1001:number = 0;
        export function formatData(data:any): void 
		{
            if(data.weapon_name_1001)
            {
                weapon_name_1001 = data.weapon_name_1001.needDay;
            }
        }

        export function getWeaponPace():number
		{
			return weapon_name_1001;
		} 
    }
}
