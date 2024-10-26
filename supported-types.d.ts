// this is an auto generated file, do not change this manually

import {
  ServiceFunction,
  ServiceFunctionTypes,
  VacuumEntityState,
} from "@hakit/core";
declare module "@hakit/core" {
  export interface CustomSupportedServices<
    T extends ServiceFunctionTypes = "target",
  > {
    homeassistant: {
      // Saves the persistent states immediately. Maintains the normal periodic saving interval.
      savePersistentStates: ServiceFunction<T, object>;
      // Generic action to turn devices off under any domain.
      turnOff: ServiceFunction<T, object>;
      // Generic action to turn devices on under any domain.
      turnOn: ServiceFunction<T, object>;
      // Generic action to toggle devices on/off under any domain.
      toggle: ServiceFunction<T, object>;
      // Stops Home Assistant.
      stop: ServiceFunction<T, object>;
      // Restarts Home Assistant.
      restart: ServiceFunction<T, object>;
      // Checks the Home Assistant YAML-configuration files for errors. Errors will be shown in the Home Assistant logs.
      checkConfig: ServiceFunction<T, object>;
      // Forces one or more entities to update its data.
      updateEntity: ServiceFunction<
        T,
        {
          // List of entities to force update.
          entity_id: string;
        }
      >;
      // Reloads the core configuration from the YAML-configuration.
      reloadCoreConfig: ServiceFunction<T, object>;
      // Updates the Home Assistant location.
      setLocation: ServiceFunction<
        T,
        {
          // Latitude of your location. @example 32.87336
          latitude: number;
          // Longitude of your location. @example 117.22743
          longitude: number;
          // Elevation of your location. @example 120
          elevation?: number;
        }
      >;
      // Reloads Jinja2 templates found in the `custom_templates` folder in your config. New values will be applied on the next render of the template.
      reloadCustomTemplates: ServiceFunction<T, object>;
      // Reloads the specified config entry.
      reloadConfigEntry: ServiceFunction<
        T,
        {
          // The configuration entry ID of the entry to be reloaded. @example 8955375327824e14ba89e4b29cc3ec9a
          entry_id?: string;
        }
      >;
      // Reload all YAML configuration that can be reloaded without restarting Home Assistant.
      reloadAll: ServiceFunction<T, object>;
    };
    persistentNotification: {
      // Shows a notification on the notifications panel.
      create: ServiceFunction<
        T,
        {
          // Message body of the notification. @example Please check your configuration.yaml.
          message: string;
          // Optional title of the notification. @example Test notification
          title?: string;
          // ID of the notification. This new notification will overwrite an existing notification with the same ID. @example 1234
          notification_id?: string;
        }
      >;
      // Removes a notification from the notifications panel.
      dismiss: ServiceFunction<
        T,
        {
          // ID of the notification to be removed. @example 1234
          notification_id: string;
        }
      >;
      // Removes all notifications from the notifications panel.
      dismissAll: ServiceFunction<T, object>;
    };
    systemLog: {
      // Clears all log entries.
      clear: ServiceFunction<T, object>;
      // Write log entry.
      write: ServiceFunction<
        T,
        {
          // Message to log. @example Something went wrong
          message: string;
          // Log level.
          level?: "debug" | "info" | "warning" | "error" | "critical";
          // Logger name under which to log the message. Defaults to `system_log.external`. @example mycomponent.myplatform
          logger?: string;
        }
      >;
    };
    logger: {
      // Sets the default log level for integrations.
      setDefaultLevel: ServiceFunction<
        T,
        {
          // Default severity level for all integrations.
          level?: "debug" | "info" | "warning" | "error" | "fatal" | "critical";
        }
      >;
      // Sets the log level for one or more integrations.
      setLevel: ServiceFunction<T, object>;
    };
    person: {
      // Reloads persons from the YAML-configuration.
      reload: ServiceFunction<T, object>;
    };
    frontend: {
      // Sets the default theme Home Assistant uses. Can be overridden by a user.
      setTheme: ServiceFunction<
        T,
        {
          // Name of a theme. @example default
          name: object;
          // Theme mode.
          mode?: "dark" | "light";
        }
      >;
      // Reloads themes from the YAML-configuration.
      reloadThemes: ServiceFunction<T, object>;
    };
    recorder: {
      // Starts purge task - to clean up old data from your database.
      purge: ServiceFunction<
        T,
        {
          // Number of days to keep the data in the database. Starting today, counting backward. A value of `7` means that everything older than a week will be purged.
          keep_days?: number;
          // Attempt to save disk space by rewriting the entire database file.
          repack?: boolean;
          // Apply `entity_id` and `event_type` filters in addition to time-based purge.
          apply_filter?: boolean;
        }
      >;
      // Starts a purge task to remove the data related to specific entities from your database.
      purgeEntities: ServiceFunction<
        T,
        {
          // List of entities for which the data is to be removed from the recorder database.
          entity_id?: string;
          // List of domains for which the data needs to be removed from the recorder database. @example sun
          domains?: object;
          // List of glob patterns used to select the entities for which the data is to be removed from the recorder database. @example domain*.object_id*
          entity_globs?: object;
          // Number of days to keep the data for rows matching the filter. Starting today, counting backward. A value of `7` means that everything older than a week will be purged. The default of 0 days will remove all matching rows immediately.
          keep_days?: number;
        }
      >;
      // Starts the recording of events and state changes.
      enable: ServiceFunction<T, object>;
      // Stops the recording of events and state changes.
      disable: ServiceFunction<T, object>;
    };
    hassio: {
      // Starts an add-on.
      addonStart: ServiceFunction<
        T,
        {
          // The add-on slug. @example core_ssh
          addon: object;
        }
      >;
      // Stops an add-on.
      addonStop: ServiceFunction<
        T,
        {
          // The add-on slug. @example core_ssh
          addon: object;
        }
      >;
      // Restarts an add-on.
      addonRestart: ServiceFunction<
        T,
        {
          // The add-on slug. @example core_ssh
          addon: object;
        }
      >;
      // Updates an add-on. This action should be used with caution since add-on updates can contain breaking changes. It is highly recommended that you review release notes/change logs before updating an add-on.
      addonUpdate: ServiceFunction<
        T,
        {
          // The add-on slug. @example core_ssh
          addon: object;
        }
      >;
      // Writes data to add-on stdin.
      addonStdin: ServiceFunction<
        T,
        {
          // The add-on slug. @example core_ssh
          addon: object;
        }
      >;
      // Powers off the host system.
      hostShutdown: ServiceFunction<T, object>;
      // Reboots the host system.
      hostReboot: ServiceFunction<T, object>;
      // Creates a full backup.
      backupFull: ServiceFunction<
        T,
        {
          // Optional (default = current date and time). @example Backup 1
          name?: string;
          // Password to protect the backup with. @example password
          password?: string;
          // Compresses the backup files.
          compressed?: boolean;
          // Name of a backup network storage to host backups. @example my_backup_mount
          location?: object;
          // Exclude the Home Assistant database file from backup
          homeassistant_exclude_database?: boolean;
        }
      >;
      // Creates a partial backup.
      backupPartial: ServiceFunction<
        T,
        {
          // Includes Home Assistant settings in the backup.
          homeassistant?: boolean;
          // Exclude the Home Assistant database file from backup
          homeassistant_exclude_database?: boolean;
          // List of add-ons to include in the backup. Use the name slug of the add-on. @example core_ssh,core_samba,core_mosquitto
          addons?: object;
          // List of directories to include in the backup. @example homeassistant,share
          folders?: object;
          // Optional (default = current date and time). @example Partial backup 1
          name?: string;
          // Password to protect the backup with. @example password
          password?: string;
          // Compresses the backup files.
          compressed?: boolean;
          // Name of a backup network storage to host backups. @example my_backup_mount
          location?: object;
        }
      >;
      // Restores from full backup.
      restoreFull: ServiceFunction<
        T,
        {
          // Slug of backup to restore from.
          slug: string;
          // Optional password. @example password
          password?: string;
        }
      >;
      // Restores from a partial backup.
      restorePartial: ServiceFunction<
        T,
        {
          // Slug of backup to restore from.
          slug: string;
          // Restores Home Assistant.
          homeassistant?: boolean;
          // List of directories to include in the backup. @example homeassistant,share
          folders?: object;
          // List of add-ons to include in the backup. Use the name slug of the add-on. @example core_ssh,core_samba,core_mosquitto
          addons?: object;
          // Optional password. @example password
          password?: string;
        }
      >;
    };
    update: {
      // Installs an update for this device or service.
      install: ServiceFunction<
        T,
        {
          // The version to install. If omitted, the latest version will be installed. @example 1.0.0
          version?: string;
          // If supported by the integration, this creates a backup before starting the update .
          backup?: boolean;
        }
      >;
      // Marks currently available update as skipped.
      skip: ServiceFunction<T, object>;
      // Removes the skipped version marker from an update.
      clearSkipped: ServiceFunction<T, object>;
    };
    cloud: {
      // Makes the instance UI accessible from outside of the local network by using Home Assistant Cloud.
      remoteConnect: ServiceFunction<T, object>;
      // Disconnects the Home Assistant UI from the Home Assistant Cloud. You will no longer be able to access your Home Assistant instance from outside your local network.
      remoteDisconnect: ServiceFunction<T, object>;
    };
    ffmpeg: {
      // Sends a start command to a ffmpeg based sensor.
      start: ServiceFunction<
        T,
        {
          // Name of entity that will start. Platform dependent.
          entity_id?: string;
        }
      >;
      // Sends a stop command to a ffmpeg based sensor.
      stop: ServiceFunction<
        T,
        {
          // Name of entity that will stop. Platform dependent.
          entity_id?: string;
        }
      >;
      // Sends a restart command to a ffmpeg based sensor.
      restart: ServiceFunction<
        T,
        {
          // Name of entity that will restart. Platform dependent.
          entity_id?: string;
        }
      >;
    };
    tts: {
      // Speaks something using text-to-speech on a media player.
      speak: ServiceFunction<
        T,
        {
          // Media players to play the message.
          media_player_entity_id: string;
          // The text you want to convert into speech so that you can listen to it on your device. @example My name is hanna
          message: string;
          // Stores this message locally so that when the text is requested again, the output can be produced more quickly.
          cache?: boolean;
          // Language to use for speech generation. @example ru
          language?: string;
          // A dictionary containing integration-specific options. @example platform specific
          options?: object;
        }
      >;
      // Removes all cached text-to-speech files and purges the memory.
      clearCache: ServiceFunction<T, object>;
      // Say something using text-to-speech on a media player with cloud.
      cloudSay: ServiceFunction<
        T,
        {
          // undefined
          entity_id: string;
          // undefined @example My name is hanna
          message: string;
          // undefined
          cache?: boolean;
          // undefined @example ru
          language?: string;
          // undefined @example platform specific
          options?: object;
        }
      >;
    };
    scene: {
      // Reloads the scenes from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Activates a scene with configuration.
      apply: ServiceFunction<
        T,
        {
          // List of entities and their target state. @example light.kitchen: 'on' light.ceiling:   state: 'on'   brightness: 80
          entities: object;
          // Time it takes the devices to transition into the states defined in the scene.
          transition?: number;
        }
      >;
      // Creates a new scene.
      create: ServiceFunction<
        T,
        {
          // The entity ID of the new scene. @example all_lights
          scene_id: string;
          // List of entities and their target state. If your entities are already in the target state right now, use `snapshot_entities` instead. @example light.tv_back_light: 'on' light.ceiling:   state: 'on'   brightness: 200
          entities?: object;
          // List of entities to be included in the snapshot. By taking a snapshot, you record the current state of those entities. If you do not want to use the current state of all your entities for this scene, you can combine the `snapshot_entities` with `entities`. @example - light.ceiling - light.kitchen
          snapshot_entities?: string;
        }
      >;
      // Deletes a dynamically created scene.
      delete: ServiceFunction<T, object>;
      // Activates a scene.
      turnOn: ServiceFunction<
        T,
        {
          // Time it takes the devices to transition into the states defined in the scene.
          transition?: number;
        }
      >;
    };
    logbook: {
      // Creates a custom entry in the logbook.
      log: ServiceFunction<
        T,
        {
          // Custom name for an entity, can be referenced using an `entity_id`. @example Kitchen
          name: string;
          // Message of the logbook entry. @example is being used
          message: string;
          // Entity to reference in the logbook entry.
          entity_id?: string;
          // Determines which icon is used in the logbook entry. The icon illustrates the integration domain related to this logbook entry. @example light
          domain?: string;
        }
      >;
    };
    zone: {
      // Reloads zones from the YAML-configuration.
      reload: ServiceFunction<T, object>;
    };
    timer: {
      // Reloads timers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Starts a timer.
      start: ServiceFunction<
        T,
        {
          // Duration the timer requires to finish. [optional]. @example 00:01:00 or 60
          duration?: string;
        }
      >;
      // Pauses a timer.
      pause: ServiceFunction<T, object>;
      // Cancels a timer.
      cancel: ServiceFunction<T, object>;
      // Finishes a timer.
      finish: ServiceFunction<T, object>;
      // Changes a timer.
      change: ServiceFunction<
        T,
        {
          // Duration to add or subtract to the running timer. @example 00:01:00, 60 or -60
          duration: string;
        }
      >;
    };
    inputSelect: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Selects the first option.
      selectFirst: ServiceFunction<T, object>;
      // Selects the last option.
      selectLast: ServiceFunction<T, object>;
      // Select the next option.
      selectNext: ServiceFunction<
        T,
        {
          // If the option should cycle from the last to the first option on the list.
          cycle?: boolean;
        }
      >;
      // Selects an option.
      selectOption: ServiceFunction<
        T,
        {
          // Option to be selected. @example 'Item A'
          option: string;
        }
      >;
      // Selects the previous option.
      selectPrevious: ServiceFunction<
        T,
        {
          // If the option should cycle from the last to the first option on the list.
          cycle?: boolean;
        }
      >;
      // Sets the options.
      setOptions: ServiceFunction<
        T,
        {
          // List of options. @example ['Item A', 'Item B', 'Item C']
          options: string;
        }
      >;
    };
    inputBoolean: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Turns on the helper.
      turnOn: ServiceFunction<T, object>;
      // Turns off the helper.
      turnOff: ServiceFunction<T, object>;
      // Toggles the helper on/off.
      toggle: ServiceFunction<T, object>;
    };
    inputButton: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Mimics the physical button press on the device.
      press: ServiceFunction<T, object>;
    };
    inputNumber: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Sets the value.
      setValue: ServiceFunction<
        T,
        {
          // The target value.
          value: number;
        }
      >;
      // Increments the value by 1 step.
      increment: ServiceFunction<T, object>;
      // Decrements the current value by 1 step.
      decrement: ServiceFunction<T, object>;
    };
    script: {
      // Reloads all the available scripts.
      reload: ServiceFunction<T, object>;
      // Runs the sequence of actions defined in a script.
      turnOn: ServiceFunction<T, object>;
      // Stops a running script.
      turnOff: ServiceFunction<T, object>;
      // Toggle a script. Starts it, if isn't running, stops it otherwise.
      toggle: ServiceFunction<T, object>;
    };
    conversation: {
      // Launches a conversation from a transcribed text.
      process: ServiceFunction<
        T,
        {
          // Transcribed text input. @example Turn all lights on
          text: string;
          // Language of text. Defaults to server language. @example NL
          language?: string;
          // Conversation agent to process your request. The conversation agent is the brains of your assistant. It processes the incoming text commands. @example homeassistant
          agent_id?: object;
          // ID of the conversation, to be able to continue a previous conversation @example my_conversation_1
          conversation_id?: string;
        }
      >;
      // Reloads the intent configuration.
      reload: ServiceFunction<
        T,
        {
          // Language to clear cached intents for. Defaults to server language. @example NL
          language?: string;
          // Conversation agent to reload. @example homeassistant
          agent_id?: object;
        }
      >;
    };
    inputText: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Sets the value.
      setValue: ServiceFunction<
        T,
        {
          // The target value. @example This is an example text
          value: string;
        }
      >;
    };
    schedule: {
      // Reloads schedules from the YAML-configuration.
      reload: ServiceFunction<T, object>;
    };
    inputDatetime: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Sets the date and/or time.
      setDatetime: ServiceFunction<
        T,
        {
          // The target date. @example '2019-04-20'
          date?: string;
          // The target time. @example '05:04:20'
          time?: object;
          // The target date & time. @example '2019-04-20 05:04:20'
          datetime?: string;
          // The target date & time, expressed by a UNIX timestamp.
          timestamp?: number;
        }
      >;
    };
    counter: {
      // Increments a counter.
      increment: ServiceFunction<T, object>;
      // Decrements a counter.
      decrement: ServiceFunction<T, object>;
      // Resets a counter.
      reset: ServiceFunction<T, object>;
      // Sets the counter value.
      setValue: ServiceFunction<
        T,
        {
          // The new counter value the entity should be set to.
          value: number;
        }
      >;
    };
    button: {
      // Press the button entity.
      press: ServiceFunction<T, object>;
    };
    climate: {
      // Turns climate device on.
      turnOn: ServiceFunction<T, object>;
      // Turns climate device off.
      turnOff: ServiceFunction<T, object>;
      // Toggles climate device, from on to off, or off to on.
      toggle: ServiceFunction<T, object>;
      // Sets HVAC operation mode.
      setHvacMode: ServiceFunction<
        T,
        {
          // HVAC operation mode.
          hvac_mode?:
            | "off"
            | "auto"
            | "cool"
            | "dry"
            | "fan_only"
            | "heat_cool"
            | "heat";
        }
      >;
      // Sets preset mode.
      setPresetMode: ServiceFunction<
        T,
        {
          // Preset mode. @example away
          preset_mode: string;
        }
      >;
      // Turns auxiliary heater on/off.
      setAuxHeat: ServiceFunction<
        T,
        {
          // New value of auxiliary heater.
          aux_heat: boolean;
        }
      >;
      // Sets target temperature.
      setTemperature: ServiceFunction<
        T,
        {
          // Target temperature.
          temperature?: number;
          // High target temperature.
          target_temp_high?: number;
          // Low target temperature.
          target_temp_low?: number;
          // HVAC operation mode.
          hvac_mode?:
            | "off"
            | "auto"
            | "cool"
            | "dry"
            | "fan_only"
            | "heat_cool"
            | "heat";
        }
      >;
      // Sets target humidity.
      setHumidity: ServiceFunction<
        T,
        {
          // Target humidity.
          humidity: number;
        }
      >;
      // Sets fan operation mode.
      setFanMode: ServiceFunction<
        T,
        {
          // Fan operation mode. @example low
          fan_mode: string;
        }
      >;
      // Sets swing operation mode.
      setSwingMode: ServiceFunction<
        T,
        {
          // Swing operation mode. @example horizontal
          swing_mode: string;
        }
      >;
    };
    cover: {
      // Opens a cover.
      openCover: ServiceFunction<T, object>;
      // Closes a cover.
      closeCover: ServiceFunction<T, object>;
      // Moves a cover to a specific position.
      setCoverPosition: ServiceFunction<
        T,
        {
          // Target position.
          position: number;
        }
      >;
      // Stops the cover movement.
      stopCover: ServiceFunction<T, object>;
      // Toggles a cover open/closed.
      toggle: ServiceFunction<T, object>;
      // Tilts a cover open.
      openCoverTilt: ServiceFunction<T, object>;
      // Tilts a cover to close.
      closeCoverTilt: ServiceFunction<T, object>;
      // Stops a tilting cover movement.
      stopCoverTilt: ServiceFunction<T, object>;
      // Moves a cover tilt to a specific position.
      setCoverTiltPosition: ServiceFunction<
        T,
        {
          // Target tilt positition.
          tilt_position: number;
        }
      >;
      // Toggles a cover tilt open/closed.
      toggleCoverTilt: ServiceFunction<T, object>;
    };
    fan: {
      // Turns fan on.
      turnOn: ServiceFunction<
        T,
        {
          // Speed of the fan.
          percentage?: number;
          // Preset mode. @example auto
          preset_mode?: string;
        }
      >;
      // Turns fan off.
      turnOff: ServiceFunction<T, object>;
      // Toggles the fan on/off.
      toggle: ServiceFunction<T, object>;
      // Increases the speed of the fan.
      increaseSpeed: ServiceFunction<
        T,
        {
          // Increases the speed by a percentage step.
          percentage_step?: number;
        }
      >;
      // Decreases the speed of the fan.
      decreaseSpeed: ServiceFunction<
        T,
        {
          // Decreases the speed by a percentage step.
          percentage_step?: number;
        }
      >;
      // Controls oscillatation of the fan.
      oscillate: ServiceFunction<
        T,
        {
          // Turn on/off oscillation.
          oscillating: boolean;
        }
      >;
      // Sets the fan rotation direction.
      setDirection: ServiceFunction<
        T,
        {
          // Direction to rotate.
          direction: "forward" | "reverse";
        }
      >;
      // Sets the fan speed.
      setPercentage: ServiceFunction<
        T,
        {
          // Speed of the fan.
          percentage: number;
        }
      >;
      // Sets preset mode.
      setPresetMode: ServiceFunction<
        T,
        {
          // Preset mode. @example auto
          preset_mode: string;
        }
      >;
    };
    light: {
      // Turn on one or more lights and adjust properties of the light, even when they are turned on already.
      turnOn: ServiceFunction<
        T,
        {
          // Duration it takes to get to next state.
          transition?: number;
          // The color in RGB format. A list of three integers between 0 and 255 representing the values of red, green, and blue. @example [255, 100, 100]
          rgb_color?: [number, number, number];
          // Color temperature in Kelvin.
          kelvin?: number | object;
          // Number indicating the percentage of full brightness, where 0 turns the light off, 1 is the minimum brightness, and 100 is the maximum brightness.
          brightness_pct?: number;
          // Change brightness by a percentage.
          brightness_step_pct?: number;
          // Light effect.
          effect?: string;
          // undefined
          advanced_fields?: object;
        }
      >;
      // Turn off one or more lights.
      turnOff: ServiceFunction<
        T,
        {
          // Duration it takes to get to next state.
          transition?: number;
          // undefined
          advanced_fields?: object;
        }
      >;
      // Toggles one or more lights, from on to off, or, off to on, based on their current state.
      toggle: ServiceFunction<
        T,
        {
          // Duration it takes to get to next state.
          transition?: number;
          // The color in RGB format. A list of three integers between 0 and 255 representing the values of red, green, and blue. @example [255, 100, 100]
          rgb_color?: [number, number, number];
          // Color temperature in Kelvin.
          kelvin?: number | object;
          // Number indicating the percentage of full brightness, where 0 turns the light off, 1 is the minimum brightness, and 100 is the maximum brightness.
          brightness_pct?: number;
          // Light effect.
          effect?: string;
          // undefined
          advanced_fields?: object;
        }
      >;
    };
    lock: {
      // Unlocks a lock.
      unlock: ServiceFunction<
        T,
        {
          // Code used to unlock the lock. @example 1234
          code?: string;
        }
      >;
      // Locks a lock.
      lock: ServiceFunction<
        T,
        {
          // Code used to lock the lock. @example 1234
          code?: string;
        }
      >;
      // Opens a lock.
      open: ServiceFunction<
        T,
        {
          // Code used to open the lock. @example 1234
          code?: string;
        }
      >;
    };
    number: {
      // Sets the value of a number.
      setValue: ServiceFunction<
        T,
        {
          // The target value to set. @example 42
          value?: string;
        }
      >;
    };
    select: {
      // Selects the first option.
      selectFirst: ServiceFunction<T, object>;
      // Selects the last option.
      selectLast: ServiceFunction<T, object>;
      // Selects the next option.
      selectNext: ServiceFunction<
        T,
        {
          // If the option should cycle from the last to the first.
          cycle?: boolean;
        }
      >;
      // Selects an option.
      selectOption: ServiceFunction<
        T,
        {
          // Option to be selected. @example 'Item A'
          option: string;
        }
      >;
      // Selects the previous option.
      selectPrevious: ServiceFunction<
        T,
        {
          // If the option should cycle from the first to the last.
          cycle?: boolean;
        }
      >;
    };
    switch: {
      // Turns a switch off.
      turnOff: ServiceFunction<T, object>;
      // Turns a switch on.
      turnOn: ServiceFunction<T, object>;
      // Toggles a switch on/off.
      toggle: ServiceFunction<T, object>;
    };
    valve: {
      // Opens a valve.
      openValve: ServiceFunction<T, object>;
      // Closes a valve.
      closeValve: ServiceFunction<T, object>;
      // Moves a valve to a specific position.
      setValvePosition: ServiceFunction<
        T,
        {
          // Target position.
          position: number;
        }
      >;
      // Stops the valve movement.
      stopValve: ServiceFunction<T, object>;
      // Toggles a valve open/closed.
      toggle: ServiceFunction<T, object>;
    };
    shoppingList: {
      // Adds an item to the shopping list.
      addItem: ServiceFunction<
        T,
        {
          // The name of the item to add. @example Beer
          name: string;
        }
      >;
      // Removes the first item with matching name from the shopping list.
      removeItem: ServiceFunction<
        T,
        {
          // The name of the item to remove. @example Beer
          name: string;
        }
      >;
      // Marks the first item with matching name as completed in the shopping list.
      completeItem: ServiceFunction<
        T,
        {
          // The name of the item to mark as completed (without removing). @example Beer
          name: string;
        }
      >;
      // Marks the first item with matching name as incomplete in the shopping list.
      incompleteItem: ServiceFunction<
        T,
        {
          // The name of the item to mark as incomplete. @example Beer
          name: string;
        }
      >;
      // Marks all items as completed in the shopping list (without removing them from the list).
      completeAll: ServiceFunction<T, object>;
      // Marks all items as incomplete in the shopping list.
      incompleteAll: ServiceFunction<T, object>;
      // Clears completed items from the shopping list.
      clearCompletedItems: ServiceFunction<T, object>;
      // Sorts all items by name in the shopping list.
      sort: ServiceFunction<
        T,
        {
          // Whether to sort in reverse (descending) order.
          reverse?: boolean;
        }
      >;
    };
    notify: {
      // Sends a notification message.
      sendMessage: ServiceFunction<
        T,
        {
          // Your notification message.
          message: string;
          // Title for your notification message.
          title?: string;
        }
      >;
      // Sends a notification that is visible in the notifications panel.
      persistentNotification: ServiceFunction<
        T,
        {
          // Message body of the notification. @example The garage door has been open for 10 minutes.
          message: string;
          // Title of the notification. @example Your Garage Door Friend
          title?: string;
          // Some integrations provide extended functionality. For information on how to use _data_, refer to the integration documentation.. @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_pixel_6 integration.
      mobileAppPixel6: ServiceFunction<
        T,
        {
          // undefined @example The garage door has been open for 10 minutes.
          message: string;
          // undefined @example Your Garage Door Friend
          title?: string;
          // undefined @example platform specific
          target?: object;
          // undefined @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_praneeths_iphone integration.
      mobileAppPraneethsIphone: ServiceFunction<
        T,
        {
          // undefined @example The garage door has been open for 10 minutes.
          message: string;
          // undefined @example Your Garage Door Friend
          title?: string;
          // undefined @example platform specific
          target?: object;
          // undefined @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the notify service.
      notify: ServiceFunction<
        T,
        {
          // undefined @example The garage door has been open for 10 minutes.
          message: string;
          // undefined @example Your Garage Door Friend
          title?: string;
          // undefined @example platform specific
          target?: object;
          // undefined @example platform specific
          data?: object;
        }
      >;
    };
    deviceTracker: {
      // Records a seen tracked device.
      see: ServiceFunction<
        T,
        {
          // MAC address of the device. @example FF:FF:FF:FF:FF:FF
          mac?: string;
          // ID of the device (find the ID in `known_devices.yaml`). @example phonedave
          dev_id?: string;
          // Hostname of the device. @example Dave
          host_name?: string;
          // Name of the location where the device is located. The options are: `home`, `not_home`, or the name of the zone. @example home
          location_name?: string;
          // GPS coordinates where the device is located, specified by latitude and longitude (for example: [51.513845, -0.100539]). @example [51.509802, -0.086692]
          gps?: object;
          // Accuracy of the GPS coordinates.
          gps_accuracy?: number;
          // Battery level of the device.
          battery?: number;
        }
      >;
    };
    weather: {
      // Get weather forecasts.
      getForecasts: ServiceFunction<
        T,
        {
          // Forecast type: daily, hourly or twice daily.
          type: "daily" | "hourly" | "twice_daily";
        }
      >;
    };
    virtual: {
      // Turn on a binary sensor.
      turnOn: ServiceFunction<T, object>;
      // Turn off a binary sensor.
      turnOff: ServiceFunction<T, object>;
      // Toggle a binary sensor.
      toggle: ServiceFunction<T, object>;
      // Move a device tracker to a new location.
      move: ServiceFunction<
        T,
        {
          // A named location to move the device tracker to. @example home
          location?: string;
          // Which coordinates to move the device tracker to. @example {'latitude': -27.9699373, 'longitude': 153.4081865}
          gps?: object;
          // Accuracy of the GPS coordinates.
          gps_accuracy?: number;
        }
      >;
      // Set the value of a sensor.
      set: ServiceFunction<
        T,
        {
          // Value to set state to. @example 10
          value: string;
        }
      >;
      // Set availability of an entity.
      setAvailable: ServiceFunction<
        T,
        {
          // Is the entity available..
          value: boolean;
        }
      >;
    };
    todo: {
      // Add a new to-do list item.
      addItem: ServiceFunction<
        T,
        {
          // The name that represents the to-do item. @example Submit income tax return
          item: string;
          // The date the to-do item is expected to be completed. @example 2023-11-17
          due_date?: object;
          // The date and time the to-do item is expected to be completed. @example 2023-11-17 13:30:00
          due_datetime?: object;
          // A more complete description of the to-do item than provided by the item name. @example A more complete description of the to-do item than that provided by the summary.
          description?: string;
        }
      >;
      // Update an existing to-do list item based on its name.
      updateItem: ServiceFunction<
        T,
        {
          // The name for the to-do list item. @example Submit income tax return
          item: string;
          // The new name of the to-do item @example Something else
          rename?: string;
          // A status or confirmation of the to-do item. @example needs_action
          status?: "needs_action" | "completed";
          // The date the to-do item is expected to be completed. @example 2023-11-17
          due_date?: object;
          // The date and time the to-do item is expected to be completed. @example 2023-11-17 13:30:00
          due_datetime?: object;
          // A more complete description of the to-do item than provided by the item name. @example A more complete description of the to-do item than that provided by the summary.
          description?: string;
        }
      >;
      // Remove an existing to-do list item by its name.
      removeItem: ServiceFunction<
        T,
        {
          // The name for the to-do list items.
          item: string;
        }
      >;
      // Get items on a to-do list.
      getItems: ServiceFunction<
        T,
        {
          // Only return to-do items with the specified statuses. Returns not completed actions by default. @example needs_action
          status?: "needs_action" | "completed";
        }
      >;
      // Remove all to-do list items that have been completed.
      removeCompletedItems: ServiceFunction<T, object>;
    };
    mediaPlayer: {
      // Turns on the power of the media player.
      turnOn: ServiceFunction<T, object>;
      // Turns off the power of the media player.
      turnOff: ServiceFunction<T, object>;
      // Toggles a media player on/off.
      toggle: ServiceFunction<T, object>;
      // Turns up the volume.
      volumeUp: ServiceFunction<T, object>;
      // Turns down the volume.
      volumeDown: ServiceFunction<T, object>;
      // Toggles play/pause.
      mediaPlayPause: ServiceFunction<T, object>;
      // Starts playing.
      mediaPlay: ServiceFunction<T, object>;
      // Pauses.
      mediaPause: ServiceFunction<T, object>;
      // Stops playing.
      mediaStop: ServiceFunction<T, object>;
      // Selects the next track.
      mediaNextTrack: ServiceFunction<T, object>;
      // Selects the previous track.
      mediaPreviousTrack: ServiceFunction<T, object>;
      // Clears the playlist.
      clearPlaylist: ServiceFunction<T, object>;
      // Sets the volume level.
      volumeSet: ServiceFunction<
        T,
        {
          // The volume. 0 is inaudible, 1 is the maximum volume.
          volume_level: number;
        }
      >;
      // Mutes or unmutes the media player.
      volumeMute: ServiceFunction<
        T,
        {
          // Defines whether or not it is muted.
          is_volume_muted: boolean;
        }
      >;
      // Allows you to go to a different part of the media that is currently playing.
      mediaSeek: ServiceFunction<
        T,
        {
          // Target position in the currently playing media. The format is platform dependent.
          seek_position: number;
        }
      >;
      // Groups media players together for synchronous playback. Only works on supported multiroom audio systems.
      join: ServiceFunction<
        T,
        {
          // The players which will be synced with the playback specified in `target`. @example - media_player.multiroom_player2 - media_player.multiroom_player3
          group_members: string[];
        }
      >;
      // Sends the media player the command to change input source.
      selectSource: ServiceFunction<
        T,
        {
          // Name of the source to switch to. Platform dependent. @example video1
          source: string;
        }
      >;
      // Selects a specific sound mode.
      selectSoundMode: ServiceFunction<
        T,
        {
          // Name of the sound mode to switch to. @example Music
          sound_mode?: string;
        }
      >;
      // Starts playing specified media.
      playMedia: ServiceFunction<
        T,
        {
          // The ID of the content to play. Platform dependent. @example https://home-assistant.io/images/cast/splash.png
          media_content_id: string | number;
          // The type of the content to play. Such as image, music, tv show, video, episode, channel, or playlist. @example music
          media_content_type: string;
          // If the content should be played now or be added to the queue.
          enqueue?: "play" | "next" | "add" | "replace";
          // If the media should be played as an announcement. @example true
          announce?: boolean;
        }
      >;
      // Playback mode that selects the media in randomized order.
      shuffleSet: ServiceFunction<
        T,
        {
          // Whether or not shuffle mode is enabled.
          shuffle: boolean;
        }
      >;
      // Removes the player from a group. Only works on platforms which support player groups.
      unjoin: ServiceFunction<T, object>;
      // Playback mode that plays the media in a loop.
      repeatSet: ServiceFunction<
        T,
        {
          // Repeat mode to set.
          repeat: "off" | "all" | "one";
        }
      >;
    };
    remote: {
      // Turns the device off.
      turnOff: ServiceFunction<T, object>;
      // Sends the power on command.
      turnOn: ServiceFunction<
        T,
        {
          // Activity ID or activity name to be started. @example BedroomTV
          activity?: string;
        }
      >;
      // Toggles a device on/off.
      toggle: ServiceFunction<T, object>;
      // Sends a command or a list of commands to a device.
      sendCommand: ServiceFunction<
        T,
        {
          // Device ID to send command to. @example 32756745
          device?: string;
          // A single command or a list of commands to send. @example Play
          command: object;
          // The number of times you want to repeat the commands.
          num_repeats?: number;
          // The time you want to wait in between repeated commands.
          delay_secs?: number;
          // The time you want to have it held before the release is send.
          hold_secs?: number;
        }
      >;
      // Learns a command or a list of commands from a device.
      learnCommand: ServiceFunction<
        T,
        {
          // Device ID to learn command from. @example television
          device?: string;
          // A single command or a list of commands to learn. @example Turn on
          command?: object;
          // The type of command to be learned.
          command_type?: "ir" | "rf";
          // If code must be stored as an alternative. This is useful for discrete codes. Discrete codes are used for toggles that only perform one function. For example, a code to only turn a device on. If it is on already, sending the code won't change the state.
          alternative?: boolean;
          // Timeout for the command to be learned.
          timeout?: number;
        }
      >;
      // Deletes a command or a list of commands from the database.
      deleteCommand: ServiceFunction<
        T,
        {
          // Device from which commands will be deleted. @example television
          device?: string;
          // The single command or the list of commands to be deleted. @example Mute
          command: object;
        }
      >;
    };
    automation: {
      // Triggers the actions of an automation.
      trigger: ServiceFunction<
        T,
        {
          // Defines whether or not the conditions will be skipped.
          skip_condition?: boolean;
        }
      >;
      // Toggles (enable / disable) an automation.
      toggle: ServiceFunction<T, object>;
      // Enables an automation.
      turnOn: ServiceFunction<T, object>;
      // Disables an automation.
      turnOff: ServiceFunction<
        T,
        {
          // Stops currently running actions.
          stop_actions?: boolean;
        }
      >;
      // Reloads the automation configuration.
      reload: ServiceFunction<T, object>;
    };
  }
  export interface CustomEntityNameContainer {
    names:
      | "person.praneethg"
      | "update.home_assistant_supervisor_update"
      | "update.home_assistant_core_update"
      | "update.matter_server_update"
      | "update.node_red_update"
      | "update.advanced_ssh_web_terminal_update"
      | "update.studio_code_server_update"
      | "update.get_hacs_update"
      | "update.home_assistant_operating_system_update"
      | "zone.home"
      | "conversation.home_assistant"
      | "sun.sun"
      | "sensor.sun_next_dawn"
      | "sensor.sun_next_dusk"
      | "sensor.sun_next_midnight"
      | "sensor.sun_next_noon"
      | "sensor.sun_next_rising"
      | "sensor.sun_next_setting"
      | "device_tracker.pixel_6"
      | "sensor.pixel_6_battery_level"
      | "sensor.pixel_6_battery_state"
      | "sensor.pixel_6_charger_type"
      | "binary_sensor.praneeths_iphone_focus"
      | "device_tracker.praneeths_iphone"
      | "sensor.praneeths_iphone_activity"
      | "sensor.praneeths_iphone_distance"
      | "sensor.praneeths_iphone_floors_ascended"
      | "sensor.praneeths_iphone_floors_descended"
      | "sensor.praneeths_iphone_battery_level"
      | "sensor.praneeths_iphone_battery_state"
      | "sensor.praneeths_iphone_storage"
      | "sensor.praneeths_iphone_steps"
      | "sensor.praneeths_iphone_average_active_pace"
      | "sensor.praneeths_iphone_ssid"
      | "sensor.praneeths_iphone_bssid"
      | "sensor.praneeths_iphone_connection_type"
      | "sensor.praneeths_iphone_sim_1"
      | "sensor.praneeths_iphone_sim_2"
      | "sensor.praneeths_iphone_geocoded_location"
      | "sensor.praneeths_iphone_last_update_trigger"
      | "sensor.praneeths_iphone_app_version"
      | "sensor.praneeths_iphone_location_permission"
      | "sensor.praneeths_iphone_watch_battery_level"
      | "sensor.praneeths_iphone_watch_battery_state"
      | "update.hacs_update"
      | "binary_sensor.rpi_power_status"
      | "weather.forecast_home"
      | "sensor.virtual_temperature_sensor"
      | "switch.virtual_light"
      | "switch.virtual_bed_lamp"
      | "tts.google_translate_en_com"
      | "binary_sensor.fios_router_wan_status"
      | "sensor.fios_router_external_ip"
      | "sensor.fios_router_download_speed"
      | "sensor.fios_router_upload_speed"
      | "todo.shopping_list"
      | "media_player.work_station"
      | "remote.work_station"
      | "automation.battery_low_notification"
      | "automation.sunrise_weather"
      | "automation.light_on_temperature";
  }
}
