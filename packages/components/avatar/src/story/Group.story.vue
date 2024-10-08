<script setup lang="ts">
import {
  Avatar,
  AvatarGroup,
} from '../'
</script>

<template>
  <Story
    title="AvatarGroup"
    auto-props-disabled
  >
    <Variant title="Basic">
      <div class="py-4">
        <div class="flex gap-3 items-center">
          <AvatarGroup :is-bordered="true">
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar name="Junior" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <Avatar name="Jane" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            <Avatar name="Joe" />
          </AvatarGroup>
        </div>
      </div>
    </Variant>
    >
    <Variant title="Disabled">
      <div class="py-4">
        <div class="flex gap-3 items-center">
          <AvatarGroup :is-bordered="true" :is-disabled="true">
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
            <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
          </AvatarGroup>
        </div>
      </div>
    </Variant>
    <Variant title="max count">
      <AvatarGroup :is-bordered="true" :max="3" class="py-4">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      </AvatarGroup>
    </Variant>
    <Variant title="total count">
      <AvatarGroup :is-bordered="true" :max="3" :total="10" class="py-4">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      </AvatarGroup>
    </Variant>
    <Variant title="custom count">
      <AvatarGroup :is-bordered="true" :max="3" :total="10" class="py-4">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        <template #count="{ count }">
          <p className="text-small text-foreground font-medium ms-2">
            +{{ count }} others
          </p>
        </template>
      </AvatarGroup>
    </Variant>
    <Variant title="group grid">
      <AvatarGroup class="py-4" :is-bordered="true" :is-grid="true" :max="7">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar src="https://i.pravatar.cc/300?u=a042581f4f29026707d" />
        <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026710d" />
        <Avatar src="https://i.pravatar.cc/300?u=a042581f4e29026712d" />
      </AvatarGroup>
    </Variant>
  </Story>
</template>
