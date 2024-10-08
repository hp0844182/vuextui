<script setup lang="ts">
import {
  Avatar,
} from '../'
import CameraIcon from './CameraIcon.vue'
</script>

<template>
  <Story
    title="Avatar"
    auto-props-disabled
  >
    <!-- :layout="{ type: 'grid', width: '50%' }" -->
    <Variant title="Basic">
      <div class="py-4">
        <div class="flex gap-3 items-center">
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          <Avatar name="Junior" />
          <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
          <Avatar name="Jane" />
          <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
          <Avatar name="Joe" />
        </div>
      </div>
    </Variant>
    <Variant title="size">
      <div className="flex gap-4 items-center">
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026024d" class="w-6 h-6 text-tiny" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258a2462d826712d" size="sm" />
        <Avatar src="https://i.pravatar.cc/150?u=a042581f4e29026704d" size="md" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026302d" size="lg" />
        <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" class="w-20 h-20 text-large" />
      </div>
    </Variant>
    <Variant title="disabled">
      <div className="flex gap-3 items-center">
        <Avatar :is-disabled="true" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar :is-disabled="true" name="Junior" />
        <Avatar :is-disabled="true" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar :is-disabled="true" name="Jane" />
        <Avatar :is-disabled="true" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar :is-disabled="true" name="Joe" />
      </div>
    </Variant>
    <Variant title="bordered">
      <div className="flex gap-4 items-center py-4">
        <Avatar :is-bordered="true" as="button" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar :is-bordered="true" as="button" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        <Avatar :is-bordered="true" as="button" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar :is-bordered="true" as="button" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <Avatar :is-bordered="true" as="button" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar :is-bordered="true" as="button" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      </div>
    </Variant>
    <Variant title="radius">
      <div class="flex gap-4  py-4 items-center">
        <Avatar :is-bordered="true" radius="full" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
        <Avatar :is-bordered="true" radius="lg" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <Avatar :is-bordered="true" radius="md" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar :is-bordered="true" radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
      </div>
    </Variant>

    <Variant title="colors">
      <div class="flex gap-4 py-4 items-center">
        <Avatar :is-bordered="true" as="button" color="default" src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
        <Avatar :is-bordered="true" as="button" color="primary" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
        <Avatar :is-bordered="true" as="button" color="secondary" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" />
        <Avatar :is-bordered="true" as="button" color="success" src="https://i.pravatar.cc/150?u=a04258114e29026302d" />
        <Avatar :is-bordered="true" as="button" color="warning" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
        <Avatar :is-bordered="true" as="button" color="danger" src="https://i.pravatar.cc/150?u=a04258114e29026708c" />
      </div>
    </Variant>
    <Variant title="fallback">
      <div class="flex gap-4 py-4 items-center">
        <Avatar :show-fallback="true" src="https://images.unsplash.com/broken" />
        <Avatar :show-fallback="true" name="Jane" src="https://images.unsplash.com/broken" />
        <Avatar :show-fallback="false" name="Joe" src="https://images.unsplash.com/broken" />
      </div>
    </Variant>
    <Variant title="custom fallback">
      <div class="flex gap-4 py-4 items-center">
        <Avatar
          show-fallback src="https://images.unsplash.com/broken"
        >
          <template #fallback>
            <CameraIcon class="animate-pulse w-6 h-6 text-default-500" fill="currentColor" />
          </template>
        </Avatar>
        <Avatar show-fallback name="Jane" src="https://images.unsplash.com/broken" />
        <Avatar name="Joe" src="https://images.unsplash.com/broken" />
      </div>
    </Variant>
  </Story>
</template>
