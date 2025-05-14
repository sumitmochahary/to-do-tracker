package com.project.todo.service;

import com.project.todo.domain.Task;
import com.project.todo.exception.TaskNotFoundException;
import com.project.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class TaskServiceImpl implements ITaskService {

    @Autowired
    private TaskRepository taskRepository;

    @Override
    public Task saveTask(Task task) {
        return taskRepository.save(task);
    }

    @Override
    public List<Task> fetchTask(Task task) throws TaskNotFoundException {
        List<Task> tasks = taskRepository.findByUserId(task.getUserId());
        if (tasks.isEmpty()) throw new TaskNotFoundException("No tasks found");
        return tasks;
    }

    @Override
    public List<Task> fetchByCategory(String tCategory) {
        return taskRepository.findByTaskCategory(tCategory);
    }

    @Override
    public List<Task> fetchByStatus(String tStatus) {
        return taskRepository.findByTaskStatus(tStatus);
    }

    @Override
    public List<Task> fetchByDueDate(LocalDate tDueDate) {
        return taskRepository.findByTaskDueDate(tDueDate);
    }
}
