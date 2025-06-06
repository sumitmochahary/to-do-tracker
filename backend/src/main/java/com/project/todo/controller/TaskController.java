package com.project.todo.controller;

import com.project.todo.domain.Task;
import com.project.todo.exception.TaskNotFoundException;
import com.project.todo.service.ITaskService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class TaskController {

    private final ITaskService iTaskService;

    @Autowired
    public TaskController(ITaskService iTaskService) {
        this.iTaskService = iTaskService;
    }

    // Helper method to validate userId from request
    private String validateAndGetUserId(HttpServletRequest request) {
        String userId = (String) request.getAttribute("userId");
        if (userId == null || userId.trim().isEmpty()) {
            return null;
        }
        return userId;
    }

    @PostMapping("/save")
    public ResponseEntity<?> insertTask(@RequestBody Task task, HttpServletRequest request) {
        String userId = validateAndGetUserId(request);
        if (userId == null) {
            return new ResponseEntity<>("Unauthorized: User ID not found", HttpStatus.UNAUTHORIZED);
        }
        task.setUserId(userId);
        Task savedTask = iTaskService.saveTask(task);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @GetMapping("/fetch")
    public ResponseEntity<?> fetchAllTasks(HttpServletRequest request) throws TaskNotFoundException {
        String userId = validateAndGetUserId(request);
        if (userId == null) {
            return new ResponseEntity<>("Unauthorized: User ID not found", HttpStatus.UNAUTHORIZED);
        }
        List<Task> taskList = iTaskService.fetchTaskByUserId(userId);
        return new ResponseEntity<>(taskList, HttpStatus.OK);
    }

//    @GetMapping("/fetch/{userId}")
//    public ResponseEntity<?> fetchTask(@PathVariable String userId, HttpServletRequest request) throws TaskNotFoundException {
//        String requestUserId = validateAndGetUserId(request);
//        if (requestUserId == null) {
//            return new ResponseEntity<>("Unauthorized: User ID not found", HttpStatus.UNAUTHORIZED);
//        }
//
//        if (!requestUserId.equals(userId)) {
//            return new ResponseEntity<>("Forbidden: Cannot access other user's tasks", HttpStatus.FORBIDDEN);
//        }
//
//        List<Task> taskList = iTaskService.fetchTaskByUserId(userId);
//        return new ResponseEntity<>(taskList, HttpStatus.OK);
//    }

    @GetMapping("/category/{taskCategory}")
    public ResponseEntity<?> fetchByCategory(@PathVariable String taskCategory, HttpServletRequest request) {
        String userId = validateAndGetUserId(request);
        if (userId == null) {
            return new ResponseEntity<>("Unauthorized: User ID not found", HttpStatus.UNAUTHORIZED);
        }

        // Optional: Filter by userId as well to ensure user only sees their own tasks
        // List<Task> tasks = iTaskService.fetchByCategoryAndUserId(taskCategory, userId);
        List<Task> tasks = iTaskService.fetchByCategory(taskCategory);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/status/{taskStatus}")
    public ResponseEntity<?> fetchByStatus(@PathVariable String taskStatus, HttpServletRequest request) {
        String userId = validateAndGetUserId(request);
        if (userId == null) {
            return new ResponseEntity<>("Unauthorized: User ID not found", HttpStatus.UNAUTHORIZED);
        }

        // Optional: Filter by userId as well to ensure user only sees their own tasks
        // List<Task> tasks = iTaskService.fetchByStatusAndUserId(taskStatus, userId);
        List<Task> tasks = iTaskService.fetchByStatus(taskStatus);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @GetMapping("/due/{taskDueDate}")
    public ResponseEntity<?> fetchByDueDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate taskDueDate, HttpServletRequest request) {
        String userId = validateAndGetUserId(request);
        if (userId == null) {
            return new ResponseEntity<>("Unauthorized: User ID not found", HttpStatus.UNAUTHORIZED);
        }

        // Optional: Filter by userId as well to ensure user only sees their own tasks
        // List<Task> tasks = iTaskService.fetchByDueDateAndUserId(taskDueDate, userId);
        List<Task> tasks = iTaskService.fetchByDueDate(taskDueDate);
        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{taskId}")
    public ResponseEntity<?> deleteTask(@PathVariable String taskId, HttpServletRequest request) throws TaskNotFoundException {
        String userId = validateAndGetUserId(request);
        if (userId == null) {
            return new ResponseEntity<>("Unauthorized: User ID not found", HttpStatus.UNAUTHORIZED);
        }

        // Optional: Verify that the task belongs to the requesting user before deletion
        // Task existingTask = iTaskService.getTaskById(taskId);
        // if (existingTask == null || !existingTask.getUserId().equals(userId)) {
        //     return new ResponseEntity<>("Forbidden: Cannot delete task that doesn't belong to you", HttpStatus.FORBIDDEN);
        // }

        iTaskService.deleteTask(taskId);
        return new ResponseEntity<>("Task deleted with ID: " + taskId, HttpStatus.OK);
    }

    @GetMapping("/status/archived")
    public ResponseEntity<?> fetchArchivedTasks(HttpServletRequest request) {
        String userId = validateAndGetUserId(request);
        if (userId == null) {
            return new ResponseEntity<>("Unauthorized: User ID not found", HttpStatus.UNAUTHORIZED);
        }

        // Optional: Filter archived tasks by userId to show only user's archived tasks
        // List<Task> archivedTasks = iTaskService.fetchArchivedTasksByUserId(userId);
        List<Task> archivedTasks = iTaskService.fetchArchivedTasks();
        return new ResponseEntity<>(archivedTasks, HttpStatus.OK);
    }

    @PatchMapping("/update/{taskId}")
    public ResponseEntity<?> updateTask(@PathVariable String taskId,
                                        @RequestBody Task task,
                                        HttpServletRequest request) throws TaskNotFoundException {
        String userId = validateAndGetUserId(request);
        if (userId == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized: User ID not found");
        }

        // Fetch the existing task
        Task existingTask = iTaskService.getTaskById(taskId);
        if (existingTask == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Task not found with ID: " + taskId);
        }

        // Check task ownership
        if (!existingTask.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Forbidden: You are not allowed to update this task");
        }

        // Ensure the updated task has the same ID and userId
        task.setTaskId(taskId);
        task.setUserId(userId);

        Task updatedTask = iTaskService.updateTask(task);
        return ResponseEntity.ok(updatedTask);
    }


    @PatchMapping("/archive/{taskId}")
    public ResponseEntity<?> archiveTask(@PathVariable String taskId, HttpServletRequest request) throws TaskNotFoundException {
        String userId = validateAndGetUserId(request);
        if (userId == null) {
            return new ResponseEntity<>("Unauthorized: User ID not found", HttpStatus.UNAUTHORIZED);
        }

        // Optional: Verify that the task belongs to the requesting user before archiving
        // Task existingTask = iTaskService.getTaskById(taskId);
        // if (existingTask == null || !existingTask.getUserId().equals(userId)) {
        //     return new ResponseEntity<>("Forbidden: Cannot archive task that doesn't belong to you", HttpStatus.FORBIDDEN);
        // }

        Task archivedTask = iTaskService.archiveTask(taskId);
        return new ResponseEntity<>(archivedTask, HttpStatus.OK);
    }
}