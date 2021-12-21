import {EnvironmentDefinition, Loader, LoaderConfig} from "@tvenceslau/trust-loader/lib";
import {getHttpApi} from "@tvenceslau/dsu-blueprint/lib";
import {Callback, criticalCallback} from "@tvenceslau/db-decorators/lib";

export function getLoaderConfig(callback: Callback){
    const http = getHttpApi();

    http.doGet('./loader-config.json', undefined, (err, data) => {
        if (err)
            return criticalCallback(new Error(`Could not load Loader Config`), callback);
        try {
            data = JSON.parse(data);
        } catch (e) {
            return criticalCallback(e as Error, callback);
        }

        callback(undefined, data as LoaderConfig);
    });
}


export function getBlueprintLoader(environment: EnvironmentDefinition, callback: Callback){

    getLoaderConfig((err, config: LoaderConfig) => {
        if (err)
            return callback(err);
        const loader: Loader = new Loader(config, environment);

    });
}