---
name: qwen-video
description: Generate videos using Alibaba Cloud DashScope Wan (通义万相) text-to-video (t2v) API (e.g., wan2.6-t2v). Use when the user asks to create a short video from a text prompt via 百炼/通义万相/wan 文生视频, and wants the agent to submit an async task, poll status, and download the mp4 locally (e.g., to Windows Desktop from WSL2).
---

# Qwen / Wan Video (DashScope) — 文生视频

This skill provides simple CLI scripts to:
1) submit an async Wan t2v job
2) poll task status until SUCCEEDED/FAILED
3) download the resulting mp4

## Requirements

- Set API key:

```bash
export DASHSCOPE_API_KEY="sk-..."
```

- Network note: if you see TLS errors like `unexpected eof while reading`, try running commands **without** proxy env vars:

```bash
env -u HTTPS_PROXY -u HTTP_PROXY -u https_proxy -u http_proxy curl ...
```

## Quick start (one command)

Generate a video and download to Windows Desktop (WSL2):

```bash
bash {baseDir}/scripts/generate.sh \
  --prompt "4秒赛博朋克雨夜城市镜头，霓虹反射，电影感镜头运动，高清" \
  --duration 4 \
  --size 1280*720 \
  --out "/mnt/c/Users/chenj/Desktop/wan_video.mp4"
```

## Submit only (returns task_id)

```bash
bash {baseDir}/scripts/submit.sh --prompt "..." --duration 4 --size 1280*720
```

## Poll status only

```bash
bash {baseDir}/scripts/poll.sh --task-id "<task_id>"
```

## API Endpoint (current)

- Submit: `POST https://dashscope.aliyuncs.com/api/v1/services/aigc/video-generation/video-synthesis`
- Status: `GET  https://dashscope.aliyuncs.com/api/v1/tasks/<task_id>`

Scripts print:
- `TASK_ID: ...`
- `VIDEO_URL: ...` (when succeeded)
- `MEDIA: <local_path>` (when downloaded)

