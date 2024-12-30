import { Tabs } from 'expo-router';
import React from 'react';


export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { display: 'none' },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Categorioas',
          headerTitleAlign: 'center',
        }}
      />
      <Tabs.Screen
        name="playing"
        options={{
          title: 'Playing',
          headerTitleAlign: 'center',
        }}
      />
    </Tabs>
  );
}
