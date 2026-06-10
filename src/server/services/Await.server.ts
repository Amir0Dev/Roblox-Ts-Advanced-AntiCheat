import { ReplicatedStorage } from "@rbxts/services";
import { BanService } from "./BanService";

const banTestEvent = ReplicatedStorage.WaitForChild("BanTest") as RemoteEvent;

banTestEvent.OnServerEvent.Connect((player, actionName) => {
    print(actionName)
    BanService.instance.executeBan(player, actionName as string);
});